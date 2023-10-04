import * as React from "react";

import { EditablePage } from "@magnolia/react-editor";
import Footer from "/templates/components/Footer";
import Card from "/templates/components/Card";
import { config } from "/magnolia.config";
import {
  fetchWatches,
  spaRootNodePath,
  getPageUrl,
  magnoliaFetch,
} from "/utils/api";

export async function getStaticProps({ params }) {
  console.log("Detail getStaticProps");

  let props = {};

  props.watches = await fetchWatches(process.env.NEXT_PUBLIC_MGNL_APP_BASE);

  // console.log("CT-ONLY watches:", props.watches);

  // Get header from home page.

  const homeUrl = getPageUrl(spaRootNodePath);
  const homeRes = await magnoliaFetch(homeUrl);
  if (homeRes.status == 200) {
    const homeJson = await homeRes.json();
    props.headerPage = homeJson;
    //Hack the template, so that we can render just the header.
    props.headerPage["mgnl:template"] = "saas-demo:pages/BasicHeader";
  }

  return {
    props,
  };
}

export default function WatchList(props) {
  return (
    <main>
      <EditablePage content={props.headerPage} config={config} />

      <section className="Section box">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <div className="page-title">The Collection</div>
            </div>
            <div>
              {props.watches.slice(0, 100).map((w) => (
                <div className="Card-fixed" key={w.name}>
                  <Card
                    supTitle={w.tagLine}
                    key={w.name}
                    title={w.name}
                    image={w.image}
                    cta={{
                      ctaTitle: "Learn More",
                      webLink: `/watches${w["@metadata"]["@path"]}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
