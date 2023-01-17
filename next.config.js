/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://nest.invest-trade.biz/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `http://nest.invest-trade.biz/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
