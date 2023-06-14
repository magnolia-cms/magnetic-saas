const baseUrl = process.env.NEXT_APP_MGNL_HOST;
const spaRootNodePath = process.env.NEXT_APP_MGNL_APP_BASE;
const pagePath = process.env.NEXT_APP_MGNL_API_PAGES;
const annotionsPath = process.env.NEXT_APP_MGNL_API_ANNOTATIONS;
const subIdQueryString = process.env.NEXT_APP_MGNL_SUB_ID_STRING;

const pagesApi = baseUrl + pagePath + spaRootNodePath + subIdQueryString;

const templateAnnotationsApi =
	baseUrl + annotionsPath + spaRootNodePath + subIdQueryString;

const getPageUrl = (nodePath) => {
	return baseUrl + pagePath + nodePath + subIdQueryString;
};

const getTemplatesUrl = (nodePath) => {
	return baseUrl + annotionsPath + nodePath + subIdQueryString;
};

export {
	baseUrl,
	spaRootNodePath,
	pagesApi,
	templateAnnotationsApi,
	getPageUrl,
	getTemplatesUrl,
};
