export function returnFetch(name){
	return fetch(`https://restcountries.com/v3.1/name/${name}`)
	.then((response) => {
		if(response.ok === true){
			return response.json();
		} else{
			return response.status;
		}
	})
}