export const Indigenous = {
	No: 'No',
	Yes: 'Yes',
	Declined: 'Declined'
} as const;

export const EntryType = {
	Indoor: 'Indoor',
	Outdoor: 'Outdoor'
} as const;

// get the year of the next exhibition based on the current date
// it is normally in the first 2 weeks of March
function getNextExhibitionYear(): string {
	const now = new Date();
	const thisYear = now.getFullYear();
	const exhibitionDateThisYear = new Date(thisYear, 3, 1); // Months are 0-indexed in JavaScript

	if (now <= exhibitionDateThisYear) {
		// If it's currently before or on April 1st, the exhibition is this year
		return thisYear.toString();
	} else {
		// If it's after April 1st, the exhibition is next year
		return (thisYear + 1).toString();
	}
}

export const EXHIBITION_YEAR = getNextExhibitionYear();
export const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again later.';
export const GENERIC_ERROR_UNEXPECTED = "Something went wrong. Sorry, we're broken!";
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
