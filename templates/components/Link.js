import A from "../../components/A";

import { spaRootNodePath } from "../../utils/api";

function PageLink(props) {
  const { label, pageLink, isButton, loggedInLabel, user } = props;
  const currentLabel = (user && loggedInLabel) || label;

  //Handle multisite.

  let url = pageLink["@path"];
  // console.log(`Link.  spaRootNodePath: ${spaRootNodePath}`);
  if (spaRootNodePath) {
    url = url.replace(spaRootNodePath, "");
  }
  // console.log(`Link.  url:${url}  label: ${label}`);

  return currentLabel ? (
    <A
      className={"PageLink" + (isButton ? " PageLink--button" : "")}
      href={url}
      label={currentLabel}
    />
  ) : null;
}

export default PageLink;
