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

app();
