import { getCatalogueExhibits } from '$lib/components/server/registrationDB';
import { PUBLIC_GET_IMAGES_FROM, PUBLIC_MAX_CATALOGUE_YEAR } from '$env/static/public';

import type { PageServerLoad } from './$types';
import { EXHIBITION_YEAR } from '../lib/constants';

export const load: PageServerLoad = async (event) => {
	// console.log(`${event.route.id} - LOAD - START`);
	const entryYear = event.url.searchParams.get('year') ?? '2025';

	if (entryYear.localeCompare(PUBLIC_MAX_CATALOGUE_YEAR) > 0) {
		return { exhibits: [] };
	}
	const twoDigitYear = EXHIBITION_YEAR.slice(-2);
	try {
		const exhibits = await getCatalogueExhibits({ rows: 999, offset: 0, entryYear });
		if (PUBLIC_GET_IMAGES_FROM === 'WORDPRESS') {
			exhibits.forEach((exhibit) => {
				const extension = exhibit.cloudURL.slice(-4);
				exhibit.cloudURL = `https://sculpturebermagui.org.au/wp-content/uploads/${EXHIBITION_YEAR}CatalogueImages/IMG${twoDigitYear}-${exhibit.exhibitNumber}${extension}`;
			});
		}
		return { exhibits };

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return { error: error.message };
	}
};
