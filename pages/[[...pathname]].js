import { EditablePage, EditorContextHelper } from "@magnolia/react-editor";
import { config } from "../magnolia.config";

import { encode } from "querystring";

import {
  spaRootNodePath,
  pagesNavApi,
  getPageUrl,
  getTemplatesUrl,
} from "../utils/api";

export async function getStaticPaths() {
  const navAPI = pagesNavApi();
  console.log("----------------");
  console.log("getStaticPaths: pagesNavApi:", navAPI);
  console.log("----------------");

  console.log("----------------");
  console.log("spaRootNodePath:", spaRootNodePath);
  console.log("NEXT_APP_MGNL_APP_BASE:", process.env.NEXT_APP_MGNL_APP_BASE);

  console.log("----------------");

  //REWORK to work with multiple

  let paths = [];

  const res = await fetch(navAPI);
  const pages = await res.json();

  paths = pages.results.map((page) => {
    let path = page["@metadata"]["@path"];

    if (spaRootNodePath) {
      return path.replace(spaRootNodePath, "");
    } else {
      return path;
    }
  });
  paths.push("/");

  console.log("getStaticPaths:" + paths);

  // paths.push("/magnetic");
  // SHORT TEST.
  paths = ["/magnetic"];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // console.log("context.preview:", context.preview);
  // console.log("context.previewData:", context.previewData);
  // console.log("context.params:", context.params);
  // console.log("context.params.pathname:", context.params.pathname);

  // Handle both Next.JS Preview mode or normal Static rendering.
  let resolvedUrl;
  if (context.preview) {
    let q = encode(context.previewData.query);
    resolvedUrl = `${context.previewData.query.slug}?${q}`;
  } else {
    resolvedUrl = context.params.pathname
      ? "/" + context.params.pathname.join("/")
      : "";
  }

  console.log("");
  console.log("GetStaticProps.");
  console.log("----------------");
  console.log("resolvedUrl:", resolvedUrl);
  console.log("----------------");

  /*
		Use the EditorContextHelper to get the correct path when the
		path is / this will resolve to /magnetic on the nodePath property
	*/
  const magnoliaContext = EditorContextHelper.getMagnoliaContext(
    resolvedUrl,
    ""
  );

  console.log("magnoliaContext:", magnoliaContext);

  // TODO: Ideally nodePath can be from magnoliaContext.nodePath - but that value is not correct.
  //const nodePath = magnoliaContext.searchParams.slug;
  let nodePath = resolvedUrl.split("?")[0];
  // const nodePath = resolvedUrl.indexOf("?") > 0 ?
  // if ( {
  //   resolvedUrl = ;
  // }

  const appBase = spaRootNodePath;
  if (appBase) {
    //nodePath = nodePath.replace(appBase, "");
    if (!nodePath.startsWith(appBase)) {
      nodePath = `${appBase}${nodePath}`;
    }
  }

  console.log("----------------");
  console.log("nodePath:", nodePath);
  console.log("----------------");
  // magnoliaContext.nodePath;

  const props = {};

  let pageJson;

  // console.log("ctx nodePath:" + magnoliaContext.nodePath);

  const pageUrl = getPageUrl(nodePath);
  console.log("----------------");
  console.log("pageUrl:", pageUrl);
  console.log("----------------");

  const pagesRes = await fetch(pageUrl);

  pageJson = await pagesRes.json();

  //Handle that react-editor expects "@id" property for keys.
  function addIDProperties(obj) {
    if (!obj || typeof obj !== "object") return;
    if (!Array.isArray(obj)) {
      if (obj["@name"]) {
        obj["@id"] = obj["@name"];
      }
    }
    Object.values(obj).forEach((obj) => addIDProperties(obj));
  }
  addIDProperties(pageJson);

  // console.log("----------------");
  // console.log("pageJson:", JSON.stringify(pageJson, null, " "));
  // console.log("----------------");

  if (!pageJson.error) props.page = pageJson;

  let templateAnnotationsJson;

  /*
		Only get the template annotatations in page edit mode
	*/
  if (magnoliaContext.isMagnoliaEdit) {
    const templatesUrl = getTemplatesUrl(nodePath);
    const templateAnnotationsRes = await fetch(templatesUrl);
    templateAnnotationsJson = await templateAnnotationsRes.json();
    props.templateAnnotations = templateAnnotationsJson;
  }

  // Required by @magnolia/react-editor
  global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

  return { props };
}

export default function Pathname(props) {
  const { page = {}, templateAnnotations = {} } = props;
  const title = page.browserTitle || page["@name"];

  return (
    <EditablePage
      content={page}
      config={config}
      templateAnnotations={templateAnnotations}
    />
  );
}

//http://localhost:3000/api/preview?slug=/magnetic&mgnlPreview=false&mgnlChannel=desktop
