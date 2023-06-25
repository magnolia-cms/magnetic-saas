import { EditablePage, EditorContextHelper } from "@magnolia/react-editor";
import { config } from "../magnolia.config";

import {
  spaRootNodePath,
  pagesNavApi,
  getPageUrl,
  getTemplatesUrl,
} from "../utils/api";

export async function getStaticPaths() {
  const res = await fetch(pagesNavApi);
  const pages = await res.json();

  const paths = pages.results.map((page) => page["@metadata"]["@path"]);
  paths.push("/");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const resolvedUrl = context.preview
    ? context.previewData.query.slug
    : context.params.pathname
    ? "/" + context.params.pathname.join("/")
    : "";

  const isPagesApp = !!context.previewData || null;

  /*
		Use the EditorContextHelper to get the correct path when the
		path is / this will resolve to /magnetic on the nodePath property
	*/
  const magnoliaContext = EditorContextHelper.getMagnoliaContext(
    resolvedUrl,
    spaRootNodePath
  );

  const props = {};

  let pageJson;

  const pageUrl = getPageUrl(magnoliaContext.nodePath);
  console.log("----------------");
  console.log("pageUrl:", pageUrl);
  console.log("----------------");

  const pagesRes = await fetch(pageUrl);

  pageJson = await pagesRes.json();

  console.log("----------------");
  console.log("pageJson:", pageJson);
  console.log("----------------");

  if (!pageJson.error) props.page = pageJson;

  let templateAnnotationsJson;

  /*
		This code should be behide a conditional that checks if the user is in page edit mode
	*/
  if (isPagesApp) {
    const templatesUrl = getTemplatesUrl(magnoliaContext.nodePath);
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
