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
  // const styleSheetLink = getStyleSheetLink(process.env.HOSTNAME);
  const styleSheetLink = getStyleSheetLink(
    process.env.NEXT_PUBLIC_MGNL_SITE_NAME
  );

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
