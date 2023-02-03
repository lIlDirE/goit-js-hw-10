import { createCountryCard } from "./index.js"; 

export function returnFetch(name){
	return fetch(`https://restcountries.com/v3.1/name/${name}?_limit=10`)
	.then((response) => response.json()
	).then(createCountryCard).catch(error => console.log(error));
}