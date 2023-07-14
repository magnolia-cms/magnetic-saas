import React, { useEffect, useState } from "react";

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
  let paths = [];

  const navAPI = pagesNavApi();
  const res = await fetch(navAPI);
  const pages = await res.json();

  console.log("----------------");
  console.log("getStaticPaths: pagesNavApi:", navAPI);
  console.log("----------------");

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

  // paths = ["/magnetic"];

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
      ? "/" + context.params.pathname.join("/")
      : "";
  }

  console.log("");
  console.log("GetStaticProps.");
  console.log("----------------");
  console.log("resolvedUrl: ", resolvedUrl);
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
  console.log("nodePath:", nodePath);

  console.log("spaRootNodePath:", spaRootNodePath);
  console.log(
    "NEXT_PUBLIC_MGNL_APP_BASE: ",
    process.env.NEXT_PUBLIC_MGNL_APP_BASE
  );
  console.log("REACT_APP_CONFIG_ENV: ", process.env.REACT_APP_CONFIG_ENV);
  console.log("NEXT_APP_CONFIG_ENV: ", process.env.NEXT_APP_CONFIG_ENV);

  console.log("");

  if (spaRootNodePath) {
    //nodePath = nodePath.replace(appBase, "");
    if (!nodePath.startsWith(spaRootNodePath)) {
      console.log("Prefix nodePath with: ", spaRootNodePath);
      nodePath = `${spaRootNodePath}${nodePath}`;
    }
  }
  console.log("nodePath", nodePath);

  const props = {};

  let pageJson;
  const pageUrl = getPageUrl(nodePath);
  console.log("pageUrl", pageUrl);
  const pagesRes = await fetch(pageUrl);
  pageJson = await pagesRes.json();

  // Get header from home page. (If not on homepage ;) )

  let homeJson;
  const homeNodePath =
    spaRootNodePath != "" ? spaRootNodePath : "/" + nodePath.split("/")[1];
  // console.log("homeNodePath", homeNodePath);

  if (homeNodePath != nodePath) {
    const homeUrl = getPageUrl(homeNodePath);
    console.log("homeUrl", homeUrl);
    const homeRes = await fetch(homeUrl);
    if (homeRes.status == 200) {
      homeJson = await homeRes.json();
      // console.log("header ", homeJson.header);
      pageJson.header = homeJson.header;
    }
  }

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
  const { page = {}, isPagesApp, templateAnnotationsUrl } = props;
  const title = page.browserTitle || page["@name"];

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
