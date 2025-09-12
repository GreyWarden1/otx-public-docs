// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.otx.markets',
	integrations: [
		starlight({
			title: 'otX.markets Documentation',
			// Use a custom stylesheet to brand Starlight with otX colors
			customCss: ['./src/styles/custom.css'],
			head: [
				{ tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
				{ tag: 'link', attrs: { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' } },
			],
			sidebar: [
				{ label: 'Overview', slug: 'overview' },
				{ label: 'Key Platform Features', slug: 'key-platform-features' },
				{ label: 'Tokenomics', slug: 'tokenomics' },
				{ label: 'System Architecture', slug: 'system-architecture' },
				{ label: 'Team / Get in touch', slug: 'team-get-in-touch' },
				{ label: 'Term sheet & Tokenomics', slug: 'term-sheet-tokenomics' },
			],
		}),
	],
});
