const getElement = (id) => document.getElementById(id);

const addClass = R.curry(function (classname, element) {
	return element.classList.add(classname);
});

const writeText = R.curry(function (text, element) {
	element.innerHTML = text;
	return element;
});

const fetchDataByCoordinate = async function ({ longitude, latitude }) {
	const response = await fetch(
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
	return response;
};

const fetchDataByCity = async function (city) {
	const response = await fetch(
		`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
		{
			headers: {
				'X-RapidAPI-Key': key,
				'X-RapidAPI-Host': host,
			},
		}
	)
		.then((res) => res.json())
		.then((data) => data);
	return response;
};
