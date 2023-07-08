export const formatedDataForZoom = (date) => {
	const inputDate = date;
	const dateObj = new Date(inputDate);
	const year = dateObj.getFullYear();
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const day = dateObj.getDate().toString().padStart(2, '0');
	const hours = dateObj.getHours().toString().padStart(2, '0');
	const minutes = dateObj.getMinutes().toString().padStart(2, '0');
	const iso8601Date = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
	return iso8601Date;
};

export const calculateMinuteDifference = (date1, date2) => {
	const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
	const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
	return minutes;
};


export const getListMeeting = ()=>{
	
}