import React, { useEffect, useState } from 'react';

import { EditablePage, EditorContextHelper } from '@magnolia/react-editor';
import { config } from '../magnolia.config';
import { encode } from 'querystring';

import {
	spaRootNodePath,
	pagesNavApi,
	getPageUrl,
	getTemplatesUrl,
} from '../utils/api';

export async function getStaticPaths() {
	const navAPI = pagesNavApi();

	//REWORK to work with multiple

	let paths = [];

	const res = await fetch(navAPI);
	const pages = await res.json();

	paths = pages.results.map((page) => {
		let path = page['@metadata']['@path'];

		if (spaRootNodePath) {
			return path.replace(spaRootNodePath, '');
		} else {
			return path;
		}
	});
	paths.push('/');

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	// Handle both Next.JS Preview mode or normal Static rendering.
	let resolvedUrl;
	if (context.preview) {
		let q = encode(context.previewData.query);
		resolvedUrl = `${context.previewData.query.slug}?${q}`;
	} else {
		resolvedUrl = context.params.pathname
			? '/' + context.params.pathname.join('/')
			: '';
	}

	/*
		Use the EditorContextHelper to get the correct path when the
		path is / this will resolve to /magnetic on the nodePath property
	*/
	const magnoliaContext = EditorContextHelper.getMagnoliaContext(
		resolvedUrl,
		''
	);

	// TODO: Ideally nodePath can be from magnoliaContext.nodePath - but that value is not correct.
	let nodePath = resolvedUrl.split('?')[0];

	const appBase = spaRootNodePath;
	if (appBase) {
		//nodePath = nodePath.replace(appBase, "");
		if (!nodePath.startsWith(appBase)) {
			nodePath = `${appBase}${nodePath}`;
		}
	}

	const props = {};

	let pageJson;
	const pageUrl = getPageUrl(nodePath);
	const pagesRes = await fetch(pageUrl);
	pageJson = await pagesRes.json();

	let headerJson;
	const headerUrl = getPageUrl('/magnetic');
	const headerRes = await fetch(headerUrl);
	headerJson = await headerRes.json();
	console.log('headerJson', headerJson);
	pageJson.header = headerJson.header;

	//Handle that react-editor expects "@id" property for keys.
	function addIDProperties(obj) {
		if (!obj || typeof obj !== 'object') return;
		if (!Array.isArray(obj)) {
			if (obj['@name']) {
				obj['@id'] = obj['@name'];
			}
		}
		Object.values(obj).forEach((obj) => addIDProperties(obj));
	}
	addIDProperties(pageJson);

	if (!pageJson.error) props.page = pageJson;
	props.isPagesApp = magnoliaContext.isMagnoliaEdit;
	props.templateAnnotationsUrl = getTemplatesUrl(nodePath);

	//let templateAnnotationsJson;

	/*
		Only get the template annotatations in page edit mode
	*/
	// if (magnoliaContext.isMagnoliaEdit) {
	// 	const templatesUrl = getTemplatesUrl(nodePath);
	// 	const templateAnnotationsRes = await fetch(templatesUrl);
	// 	templateAnnotationsJson = await templateAnnotationsRes.json();
	// 	props.templateAnnotations = templateAnnotationsJson;
	// }

	// Required by @magnolia/react-editor
	global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

	return { props };
}

export default function Pathname(props) {
	console.log(props);
	const { page = {}, isPagesApp, templateAnnotationsUrl } = props;
	const title = page.browserTitle || page['@name'];

	const [templateAnnotations, setTemplateAnnotations] = useState();

	useEffect(() => {
		async function fetchTemplateAnnotations() {
			const templateAnnotationsRes = await fetch(templateAnnotationsUrl);
			const templateAnnotationsJson = await templateAnnotationsRes.json();
			setTemplateAnnotations(templateAnnotationsJson);
		}

		if (isPagesApp) fetchTemplateAnnotations();
	}, [isPagesApp, templateAnnotationsUrl]);

	return (
		<EditablePage
			content={page}
			config={config}
			templateAnnotations={templateAnnotations}
		/>
	);
}
