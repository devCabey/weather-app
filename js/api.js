// getting current location weather
// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=40f203f9880d84645820b0bf47828823

/**
 * https://weatherapi-com.p.rapidapi.com/current.json?q={Accra}
 */

async function app() {
	navigator
		? 'geolocation' in navigator
			? navigator.geolocation.getCurrentPosition(async (position) => {
					const data = await fetchDataByCoordinate({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});

					contructData(data);
			  })
			: console.log('Geolocation not available')
		: console.log('Navigator not available');
}

function contructData(data) {
	const city = getElement('city');
	const country = getElement('country');
	const time = getElement('time');
	const dater = getElement('dater');
	const image_indicator = getElement('image_indicator');
	const condition = getElement('condition');
	const temperature = getElement('temperature');
	const celcius = getElement('celcius');
	const fel = getElement('fel');
	const timing = new Date(data?.location?.localtime);

	writeText(data?.location?.name, city);
	writeText(data?.location?.country, country);
	writeText(timing.toLocaleTimeString(), time);
	writeText(timing.toDateString(), dater);
	writeText(data?.current?.condition.text, condition);
	writeText(data?.current?.temp_c, temperature);

	image_indicator.src = data?.current?.condition.icon;

	celcius.addEventListener('click', (e) => {
		e.preventDefault();
		writeText(data?.current?.temp_c, temperature);
		addClass('activated', celcius);
		fel.classList.remove('activated');
	});

	fel.addEventListener('click', (e) => {
		e.preventDefault();
		writeText(data?.current?.temp_f, temperature);
		addClass('activated', fel);
		celcius.classList.remove('activated');
	});

	data?.current?.is_day
		? (document.body.style.backgroundImage =
				'url(https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)')
		: (document.body.style.backgroundImage =
				'url(https://static.vecteezy.com/system/resources/previews/000/365/390/original/vector-night-sky-with-moon.jpg)');
}

app();
