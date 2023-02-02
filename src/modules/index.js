import '../css/styles.css';
import { returnFetch } from "./fetchCountries.js"; export {createCountryCard};
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const countryInfoCard = document.querySelector('.country-info');
let textInput = document.getElementById('search-box');

const eventInput = () => { returnFetch(textInput.value.trim())};
textInput.addEventListener("input", debounce(eventInput, 300));

function createCountryCard(country){
	let markup = ``;
	if(country.length > 1 && country.length < 11){
		for(let i=1; i<=country.length; i+=1){
			const propertyNames = country[i].flags;
			let {svg} = propertyNames;
			markup += `<p><img src=${(svg)} width="20" alt="">   ${country[i].name.official}</p>`;
			countryInfoCard.innerHTML = markup;
			if(i==10){
				return;
			}
		};
	} 
	else if(country.length == 1){
		const propertyNames = country[0].flags;
		let {svg} = propertyNames;
		markup = `<h1><img src=${(svg)} width="30" alt=""> ${country[0].name.official}</h1>
		<div class="otherParametrsContainer">
			<p>Capital: ${country[0].capital}</p>
			<p>Population: ${country[0].population}</p>
			<p>Languages: ${Object.values(country[0].languages)}</p>
		</div>`
		// console.log(Object.keys(country[0].flags[svg]));
	} else if(country.length >= 11){
		markup = '';
		Notiflix.Notify.success("Too many matches found. Please enter a more specific name.");
	} else{
		markup = '';
		Notiflix.Notify.failure("Oops, there is no country with that name");
	}
	countryInfoCard.innerHTML = markup;
}

