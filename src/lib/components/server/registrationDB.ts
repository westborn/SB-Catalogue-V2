import { prisma } from '$lib/components/server/prisma.ts';

export type CatalogueExhibit = {
	artistId: number;
	email: string;
	lastName: string;
	firstName: string;
	artistName: string;
	phone: string;
	postcode: string;
	firstNations: string;
	bankAccountName: string;
	bankBSB: string;
	bankAccount: string;
	registrationYear: string;
	closed: boolean;
	entryId: number;
	accepted: boolean;
	description: string;
	dimensions: string;
	inOrOut: string;
	material: string;
	title: string;
	price: number;
	sold: boolean;
	imageId: number;
	cloudURL: string;
	exhibitNumber: string;
};

export const getCatalogueExhibits = async ({
	rows,
	offset,
	entryYear
}: {
	rows: number;
	offset: number;
	entryYear: string;
}): Promise<CatalogueExhibit[]> => {
	const exhibits: CatalogueExhibit[] = await prisma.$queryRaw`select
		artist.id as "artistId",
		artist.email,
		artist.last_name as "lastName",
		artist.first_name as "firstName",
		concat(artist.first_name, ' ', artist.last_name) as "artistName",
		artist.phone,
		artist.postcode,
		artist.first_nations as "firstNations",
		artist.bank_account_name as "bankAccountName",
		artist.bank_bsb as "bankBSB",
		artist.bank_account as "bankAccount",
		registration.registration_year as "registrationYear",
		registration.closed,
		entry.id as "entryId",
		entry.accepted,
		entry.description,
		entry.dimensions,
		entry.in_or_out as "inOrOut",
		entry.material,
		entry.title,
		entry.price_in_cents as "price",
		entry.sold,
		image.id as "imageId",
		image.cloud_url as "cloudURL",
		CASE WHEN location.exhibit_number is NULL THEN NULL ELSE location.exhibit_number END as "exhibitNumber"
		from
		artist
		join registration on artist.id = registration.artist_id
		join entry on registration.id = entry.registration_id
		-- -- only enties which have been allocated a location
		join location on entry.id = location.entry_id
		join primary_image on entry.id = primary_image.entry_id
		join image on primary_image.image_id = image.id
		where
		-- -- artist.email = 'epsilonartist@gmail.com' AND
		registration.registration_year = ${entryYear}
		order by location.exhibit_number asc
		OFFSET ${offset} ROWS
		LIMIT ${rows}
		`;
	return exhibits;
};
