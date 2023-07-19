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

const isEmptyObject = (data) => Object.keys(data).length == 0;

const dispatch = R.curry(function (eventType, element, fn) {
	element.removeEventListener(eventType, fn);
	element.addEventListener(eventType, fn);
	return element;
});

function contructData(data) {
	const city = getElement('city');
	const country = getElement('country');
	const time = getElement('time');
	const dater = getElement('dater');
	const image_indicator = getElement('image_indicator');
	const condition = getElement('condition');
	const temperature = getElement('temperature');
	const celcius = getElement('celcius');
	const fehrenhiet = getElement('fehrenhiet');
	const timing = new Date(data?.location?.localtime);

	writeText(data?.location?.name, city);
	writeText(data?.location?.country, country);
	writeText(timing.toLocaleTimeString(), time);
	writeText(timing.toDateString(), dater);
	writeText(data?.current?.condition.text, condition);
	writeText(data?.current?.temp_c, temperature);

	image_indicator.src = data?.current?.condition.icon;

	dispatch('click', celcius, (e) => {
		e.preventDefault();
		writeText(data?.current?.temp_c, temperature);
		addClass('activated', celcius);
		fehrenhiet.classList.remove('activated');
	});

	dispatch('click', fehrenhiet, (e) => {
		e.preventDefault();
		writeText(data?.current?.temp_f, temperature);
		addClass('activated', fehrenhiet);
		celcius.classList.remove('activated');
	});

	document.body.style.backgroundImage = data?.current?.is_day
		? 'url(https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)'
		: 'url(https://static.vecteezy.com/system/resources/previews/000/365/390/original/vector-night-sky-with-moon.jpg)';
}
