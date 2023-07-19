const getElement = (id) => document.getElementById(id);

const addClass = R.curry(function (classname, element) {
	return element.classList.add(classname);
});

const fetchDataByCoordinate = function ({ longitude, latitude }) {
	const data = fetch(
		`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`,
		{
			headers: {
				'X-RapidAPI-Key': 'f7ce8a6e8cmsh987eaefb4062f39p1c7499jsn78a8205605a6',
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
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
				'X-RapidAPI-Key': 'f7ce8a6e8cmsh987eaefb4062f39p1c7499jsn78a8205605a6',
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
			},
		});
		return response;
	};
};
