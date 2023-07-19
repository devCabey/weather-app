const getElement = (id) => document.getElementById(id);

const addClass = R.curry(function (classname, element) {
	return element.classList.add(classname);
});

const fetchDataByCoordinate = function ({ longitude, latitude }) {
	const data = fetch(
		`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`,
		{
			headers: {
				'X-RapidAPI-Key': key,
				'X-RapidAPI-Host': host,
			},
		}
	)
		.then((res) => res.json())
		.then((data) => data);

	return data;
};

const fetchDataByCity = async function (city) {
	return async function (url) {
		const response = await fetch(`${url}?q=${city}`, {
			headers: {
				'X-RapidAPI-Key': key,
				'X-RapidAPI-Host': host,
			},
		});
		return response;
	};
};
