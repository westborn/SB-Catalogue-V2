import { getExhibits } from '$lib/components/server/registrationDB';
import { PUBLIC_MAX_CATALOGUE_YEAR } from '$env/static/public';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	console.log(`${event.route.id} - LOAD - START`);
	const entryYear = event.url.searchParams.get('year') ?? '2025';
	// Only admins can see the current exhibition year entries
	if (entryYear.localeCompare(PUBLIC_MAX_CATALOGUE_YEAR) > 0) {
		console.log('entry year', entryYear, PUBLIC_MAX_CATALOGUE_YEAR);
		return { exhibits: [] };
	}
	try {
		const exhibits = await getExhibits({ rows: 999, offset: 0, entryYear });
		return { exhibits };

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return { error: error.message };
	}
};
