/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'Rumble Studio',
	tagline: 'Dinosaurs are cool',
	url: 'https://your-docusaurus-test-site.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'facebook', // Usually your GitHub org/user name.
	projectName: 'docusaurus', // Usually your repo name.
	themeConfig: {
		navbar: {
			title: 'Rumble Studio',
			logo: {
				alt: 'My Site Logo',
				src: 'img/rumblestudio.png',
			},
			items: [
				{
					position: 'left',
					label: 'Documentation',
					items: [
						{
							label: 'Get started',
							href: 'docs/intro',
						},
						{
							label: 'Rumble Player',
							href: '/docs/Rumble%20Player/installation',
						},
					],
				},
				{
					href: 'https://github.com/Rumble-Studio/rumblestudio',
					label: 'GitHub',
					position: 'left',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Tutorial',
							to: '/docs/intro',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Linkedin',
							href: 'https://www.linkedin.com/company/rumblestudio/',
						},
						{
							label: 'Facebook',
							href: 'https://www.facebook.com/rumblestudio/',
						},
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/Rumble-Studio/rumblestudio',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl:
						'https://github.com/facebook/docusaurus/edit/master/website/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
	plugins: [
		[
			'docusaurus-plugin-typedoc',
			{
				entryPoints: ['../src/index.ts'],
				tsconfig: '../tsconfig.json',
			},
		],
	],
};
