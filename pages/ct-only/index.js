import * as React from "react";
// import Img from "../../components/Img";
// import CTA from "../../components/CTA";
// import ProductWatch from "../../components/ProductWatch";

import Card from "/templates/components/Card";

// import RenderHomeHeader from "/templates/pages/Home";
// const currentGitBranch = require("current-git-branch");
// const gitBranch = require("git-branch");

import {
  fetchWatch,
  fetchWatches,
  spaRootNodePath,
  getPageUrl,
  magnoliaFetch,
} from "/utils/api";

// export async function getStaticPaths() {
//   console.log("Watch getStaticPaths Start." + new Date().getSeconds());

//   // When this is true (in preview environments) don't
//   // prerender any static pages
//   // (faster builds, but slower initial page load)
//   if (true || process.env.SKIP_BUILD_STATIC_GENERATION) {
//     console.log("CT ONLY getStaticPaths BAILOUT");

//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }

//   const watches = await fetchWatches();

//   console.log("watches:", watches);

//   // Get the paths we want to prerender based on posts
//   // In production environments, prerender all pages
//   // (slower builds, but faster initial page load)

// //   const paths = watches.map((watch) => {
// //     const pathAsArray = watch["@metadata"]["@path"].substring(1).split("/");
// //     return {
// //       params: { name: pathAsArray },
// //     };
// //   });
//   const paths = ["/ct-only"]

//   console.log("Detail paths (Watches):" + JSON.stringify(paths, null, 2));

//   // { fallback: false } means other routes should 404
//   return { paths, fallback: false };
// }

export async function getStaticProps({ params }) {
  console.log("Detail getStaticProps");

  let props = {};

  props.watches = await fetchWatches();

  console.log("CT-ONLY watches:", props.watches);

  return {
    props,
  };
}

export default function WatchList(props) {
  return (
    <main>
      <div>
        <div class="row">
          <div class="col-3">
            {props.watches.map((w) => (
              <Card
                supTitle={w.tagLine}
                key={w.name}
                title={w.name}
                image={w.image}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
