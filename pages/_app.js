import "../styles/grid.css";
import "../styles/globals.css";
import "../styles/desktop.css";

import Head from "next/head";

function getStyleSheetLink(siteName) {
  var cssLink = `/brand-${siteName}.css`;
  //   if (siteName==="a"){
  // 	cssLink = "/test.css";
  //   }=
  console.log("getStyleSheetLink", cssLink);
  return cssLink;
}

function MyApp({ Component, pageProps }) {
  // console.log("MyApp pageProps:", pageProps);
  let siteName = "";

  //pageProps can be `page` or `statusCode`.
  if (pageProps.page && pageProps.page["@path"]) {
    let siteNameEnv = process.env.NEXT_PUBLIC_MGNL_APP_BASE;

    console.log("");

    if (siteNameEnv && siteNameEnv != "") {
      // console.log("siteNameEnv", siteNameEnv);
      siteName = siteNameEnv;
      if (siteNameEnv[0] == "/") siteName = siteName.slice(1);
    } else {
      siteName = pageProps.page["@path"].split("/")[1];
    }

    console.log("");
    console.log("siteName:", siteName);
    console.log("");
  }
  const styleSheetLink = getStyleSheetLink(siteName);

  return (
    <>
      <Head>
        <link href={styleSheetLink} rel="stylesheet" type="text/css" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
