import Link from "next/link";
import { spaRootNodePath } from "../utils/api";

/*

*/

function A(props) {
  const { className, href, label } = props;

  let newLink = href;

  if (spaRootNodePath) {
    newLink = href.replace(spaRootNodePath, "");
  }

  // console.log(newLink, spaRootNodePath);
  return (
    <a className={className} href={newLink}>
      {label}
    </a>
  );
}

export default A;
