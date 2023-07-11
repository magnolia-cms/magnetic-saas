import { spaRootNodePath } from '../../utils/api';

const setCookieSameSite = (res) => {
	const cookies = res.getHeader('Set-Cookie');
	res.setHeader(
		'Set-Cookie',
		cookies?.map((cookie) =>
			cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
		)
	);
};

export default function handler(req, res) {
	res.setPreviewData({
		query: req.query,
	});

	setCookieSameSite(res);

	res.redirect(req.query.slug);
}
