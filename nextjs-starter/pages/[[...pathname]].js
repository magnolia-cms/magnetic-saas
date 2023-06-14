import { EditablePage, EditorContextHelper } from '@magnolia/react-editor';
import { config } from '../utils/config';

import {
	spaRootNodePath,
	pagesApi,
	templateAnnotationsApi,
	getPageUrl,
	getTemplatesUrl,
} from '../utils/api';

export async function getServerSideProps(context) {
	const resolvedUrl = context.resolvedUrl;
	const magnoliaContext = EditorContextHelper.getMagnoliaContext(
		resolvedUrl,
		spaRootNodePath
	);

	const props = {};

	let pageJson;

	const pageUrl = getPageUrl(magnoliaContext.nodePath);
	const pagesRes = await fetch(pageUrl);

	console.log('I am here', pageUrl);

	pageJson = await pagesRes.json();

	if (!pageJson.error) props.page = pageJson;

	let templateAnnotationsJson;

	if (magnoliaContext.isMagnolia) {
		const templatesUrl = getTemplatesUrl(magnoliaContext.nodePath);
		const templateAnnotationsRes = await fetch(templatesUrl);
		templateAnnotationsJson = await templateAnnotationsRes.json();
		props.templateAnnotations = templateAnnotationsJson;
		console.log('TEmp, templatesUrl', templatesUrl);
	}

	props.urls = {
		pagesApi,
		templateAnnotationsApi,
	};

	// Required by @magnolia/react-editor
	global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

	// console.log('I am here', pageUrl);

	return { props };
}

export default function Pathname(props) {
	const { page = {}, templateAnnotations = {} } = props;
	const title = page.browserTitle || page['@name'];

	return (
		<EditablePage
			content={page}
			config={config}
			templateAnnotations={templateAnnotations}
		/>
	);
}
