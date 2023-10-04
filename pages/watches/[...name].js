import * as React from "react";
// import Img from "../../components/Img";
// import CTA from "../../components/CTA";
import ProductWatch from "/components/ProductWatch";

// import RenderHomeHeader from "/templates/pages/Home";
// const currentGitBranch = require("current-git-branch");
// const gitBranch = require("git-branch");

import {
  fetchWatch,
  fetchWatches,
  spaRootNodePath,
  getPageUrl,
  magnoliaFetch,
} from "../../utils/api";

import { renderHomeHeader } from "/templates/pages/Home";
import { config } from "/magnolia.config";

export async function getStaticPaths() {
  console.log("Watch getStaticPaths Start." + new Date().getSeconds());

  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (true || process.env.SKIP_BUILD_STATIC_GENERATION) {
    console.log("Detail getStaticPaths BAILOUT");

    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // const envName = currentGitBranch().replace("env/", "");
  // const envName = currentGitBranch();
  // const envName = gitBranch.sync();
  // const envName = process.env.GIT_BRANCH;
  // const envName = "main";

  const watches = await fetchWatches();

  console.log("watches:", watches);

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)

  const paths = watches.map((watch) => {
    const pathAsArray = watch["@metadata"]["@path"].substring(1).split("/");
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
  const decodedName = decodeURI(name);
  console.log("details gSP B ", decodedName);
  const decodedName2 = decodedName.replace(",", "/");
  console.log("details gSP C ", decodedName2);

  // const envName = process.env.GIT_BRANCH;
  // const envName = currentGitBranch();
  props = await fetchWatch(decodedName2);
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
