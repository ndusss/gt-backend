const datetimeNow = () => {
	let d = new Date();
	let YYYY = d.getFullYear();
	let MM = d.getMonth() + 1;
	let DD = d.getDate();
	let HH = d.getHours();
	let mm = d.getMinutes();
	let ss = d.getSeconds();

	let createdAtDate = `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
	return createdAtDate;
};

module.exports = datetimeNow;

