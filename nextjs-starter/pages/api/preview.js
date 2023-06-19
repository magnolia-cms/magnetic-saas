export default function handler(req, res) {
	res.setPreviewData({
		query: req.query,
	});

	res.redirect(req.query.slug);
}
