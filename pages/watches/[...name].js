import * as React from "react";

import ProductWatch from "/components/ProductWatch";

import {
  fetchWatch,
  fetchWatches,
  spaRootNodePath,
  getPageUrl,
  magnoliaFetch,
} from "../../utils/api";

import { renderHomeHeader } from "/templates/pages/Home";

export async function getStaticPaths() {
  console.log("Watch getStaticPaths Start." + new Date().getSeconds());

  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (false || process.env.SKIP_BUILD_STATIC_GENERATION) {
    console.log("Detail getStaticPaths BAILOUT");

    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const watches = await fetchWatches(process.env.NEXT_PUBLIC_MGNL_APP_BASE);

  console.log("watches:", watches);

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)

  const paths = watches.map((watch) => {
    const pathAsArray = watch["@metadata"]["@path"]
      .replace(spaRootNodePath, "")
      .substring(1)
      .split("/");
    return {
      params: { name: pathAsArray },
    };
  });

  console.log("Detail paths (Watches):" + JSON.stringify(paths, null, 2));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log("Detail getStaticProps");

  let props = {};

  const name = params.name;
  var decodedName = decodeURI(name);
  decodedName = decodedName.replace(",", "/");
  const path = spaRootNodePath + "/" + decodedName;
  console.log("details gSP D ", path);

  props = await fetchWatch(path);
  //   console.log("props:" + JSON.stringify(props, null, 2));

  // Get header from home page.

  const homeUrl = getPageUrl(spaRootNodePath);
  const homeRes = await magnoliaFetch(homeUrl);
  if (homeRes.status == 200) {
    const homeJson = await homeRes.json();
    // props.header = homeJson.header;
    props.headerPage = homeJson;
    //Hack the template, so that we can render just the header.
    props.headerPage["mgnl:template"] = "saas-demo:pages/BasicHeader";
  }

  return {
    props,
  };
}

export default function Detail(props) {
  return <ProductWatch {...props} />;
}
