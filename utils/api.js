const baseUrl = process.env.NEXT_APP_MGNL_HOST;
const spaRootNodePath = process.env.NEXT_PUBLIC_MGNL_APP_BASE ?? "";
const pagePath = process.env.NEXT_APP_MGNL_API_PAGES;
const pagesNavPath = process.env.NEXT_APP_MGNL_API_NAV;
const annotionsPath = process.env.NEXT_APP_MGNL_API_ANNOTATIONS;

const pagesApi = baseUrl + pagePath + spaRootNodePath;

const pagesNavApi = () => {
  if (spaRootNodePath) {
    return baseUrl + pagesNavPath + spaRootNodePath + "@nodes";
  } else {
    return baseUrl + pagesNavPath;
  }
};

const templateAnnotationsApi = baseUrl + annotionsPath + spaRootNodePath;

const getPageUrl = (nodePath) => {
  return baseUrl + pagePath + nodePath;
};

const getTemplatesUrl = (nodePath) => {
  return baseUrl + annotionsPath + nodePath;
};

export {
  baseUrl,
  spaRootNodePath,
  pagesApi,
  pagesNavApi,
  templateAnnotationsApi,
  getPageUrl,
  getTemplatesUrl,
};
