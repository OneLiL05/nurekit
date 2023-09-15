import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://onelil05.github.io',
  base: '/nurekit',
	vite: {
    ssr: {
      noExternal: ["execa"],
    },
  },
	integrations: [
		starlight({
			title: 'Nurekit',
			social: {
				github: 'https://github.com/OneLiL05/nurekit',
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' }
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
