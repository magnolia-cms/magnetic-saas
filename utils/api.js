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

/** Appends headers required for livesync feaature. */
async function magnoliaFetch(url) {
  const liveSyncSessionId = process.env.NEXT_PUBLIC_MGNL_LIVE_SYNC_SESSION_ID;

  // console.log("magnoliaFetch. Fetching ", url);

  // console.log(
  //   "magnoliaFetch. Fetching ",
  //   url,
  //   " with livesync session id:",
  //   liveSyncSessionId
  // );

  const headers = new Headers();
  if (liveSyncSessionId && liveSyncSessionId.trim() !== "") {
    headers.append("live-sync-session-id", liveSyncSessionId);
  }

  const response = await fetch(url, {
    headers: headers,
  });
  return response;
}

const fetchWatch = async (name) => {
  console.log("fetchWatch path:" + name);
  const endpoint = baseUrl + `/delivery/watches/v1/${name}`;
  console.log("fetchWatch endpoint:" + endpoint);
  const response = await magnoliaFetch(endpoint);
  const json = await response.json();
  return json;
};

const fetchWatches = async () => {
  console.log("fetchWatches");
  var endpoint = baseUrl + `/delivery/watches/v1/?mgnl:type[eq]=watch`;
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
