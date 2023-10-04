const baseUrl = process.env.NEXT_APP_MGNL_HOST;
const spaRootNodePath = process.env.NEXT_PUBLIC_MGNL_APP_BASE ?? "";
const pagePath = process.env.NEXT_APP_MGNL_API_PAGES;
const pagesNavPath = process.env.NEXT_APP_MGNL_API_NAV;
const annotionsPath = process.env.NEXT_APP_MGNL_API_ANNOTATIONS;
const watchesPath = process.env.NEXT_APP_MGNL_API_WATCHES;

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

/** Appends headers required for livesync feaature. */
async function magnoliaFetch(url) {
  const liveSyncSessionId = process.env.NEXT_PUBLIC_MGNL_LIVE_SYNC_SESSION_ID;

  const headers = new Headers();
  if (liveSyncSessionId && liveSyncSessionId.trim() !== "") {
    headers.append("live-sync-session-id", liveSyncSessionId);
  }
  const response = await fetch(url, {
    headers: headers,
  });
  return response;
}

const fetchWatch = async (path) => {
  console.log("fetchWatch path:" + path);
  const endpoint = baseUrl + `${watchesPath}${path}`;
  console.log("fetchWatch endpoint:" + endpoint);
  const response = await magnoliaFetch(endpoint);
  const json = await response.json();
  return json;
};

//folderPath - please prefix with "/"
const fetchWatches = async (folderPath) => {
  console.log("fetchWatches");
  var endpoint;
  if (folderPath) {
    endpoint =
      baseUrl + `${watchesPath}${folderPath}/@nodes?mgnl:type[eq]=watch`;
  } else {
    endpoint = baseUrl + `${watchesPath}?mgnl:type[eq]=watch`;
  }
  console.log("fetchWatch endpoint:" + endpoint);
  endpoint = encodeURI(endpoint);
  console.log("fetchWatch endpoint:" + endpoint);
  const response = await magnoliaFetch(endpoint);
  const json = await response.json();
  console.log("****** json:" + JSON.stringify(json, null, 2));
  return json.results;
};

export {
  baseUrl,
  spaRootNodePath,
  pagesApi,
  pagesNavApi,
  templateAnnotationsApi,
  getPageUrl,
  getTemplatesUrl,
  magnoliaFetch,
  fetchWatch,
  fetchWatches,
};
