/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dam.saas.magnolia-cloud.com',
				port: '',
				pathname: `/${process.env.NEXT_APP_MGNL_SUB_ID}/**`,
			},
		],
	},
};

module.exports = nextConfig;
