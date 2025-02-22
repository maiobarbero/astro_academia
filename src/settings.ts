export const profile = {
	fullName: 'Marie Curie',
	title: 'Dr.',
	institute: 'University of Paris',
	author_name: 'Marie Curie', // Author name to be highlighted in the papers section
	research_areas: [
		{ title: 'Physics', description: 'Brief description of the research interest', field: 'physics' },
		{ title: 'Chemistry', description: 'Brief description of the research interest', field: 'chemistry' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: 'email@email.com',
	linkedin: 'https://www.linkedin.com/',
	x: 'https://www.x.com/',
	github: 'https://github.com',
	gitlab: '',
	scholar: '',
	inspire: 'https://inspirehep.net/',
	arxiv: '',
}

export const template = {
	website_url: 'https://maiobarbero.github.io/', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '/astro_academia' // Repository name starting with /
}

export const seo = {
	default_title: 'Astro Academia',
	default_description: 'Astro Academia is a template for academic websites.',
	default_image: '/images/astro-academia.png',
}
