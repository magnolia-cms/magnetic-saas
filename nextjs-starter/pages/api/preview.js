// More about Preview Mode: https://nextjs.org/docs/advanced-features/preview-mode

export default function handler(req, res) {
  console.log("preview-api 1.");
  res.setPreviewData({
    query: req.query,
  });
  console.log("preview-api 2.");
  res.redirect(req.query.slug);
}
