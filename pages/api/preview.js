import { spaRootNodePath } from "../../utils/api";

const setCookieSameSite = (res) => {
  const cookies = res.getHeader("Set-Cookie");
  res.setHeader(
    "Set-Cookie",
    cookies?.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure")
    )
  );
};

export default function handler(req, res) {
  res.setPreviewData({
    query: req.query,
  });

  setCookieSameSite(res);

  let nodePath = req.query.slug;

  // if (spaRootNodePath) {
  // 	if (!nodePath.startsWith(spaRootNodePath)) {
  // 	  nodePath = `${spaRootNodePath}${nodePath}`;
  // 	}
  //   }
  console.log("Preview.query:", req.query);

  res.redirect("/");
}
