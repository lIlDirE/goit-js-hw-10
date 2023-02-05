import '../css/styles.css';
import { returnFetch } from "./fetchCountries.js";
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const countryInfoCard = document.querySelector('.country-info');
let textInput = document.getElementById('search-box');

const eventInput = () => { 
	const text = textInput.value.trim();
	if(text == ""){
		return;
	} else{
		returnFetch(text).then(createCountryCard).catch(newError);
	}
}

textInput.addEventListener("input", debounce(eventInput, 300));

function createCountryCard(country){
	let markup = ``;
	if(country.length > 1 && country.length < 11){
		markup = markupList(country);
	} 
	else if(country.length == 1){
		markup = markupSoloCard(country[0]);
	} else if(country.length >= 11){
		markup = '';
		Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
	} 
	countryInfoCard.innerHTML = markup;
}

function markupSoloCard(event){
	const propertyNames = event.flags;
	let {svg} = propertyNames;
	return `<h1><img src=${(svg)} width="30" alt=""> ${event.name.official}</h1>
	<div class="otherParametrsContainer">
		<p>Capital: ${event.capital}</p>
		<p>Population: ${event.population}</p>
		<p>Languages: ${Object.values(event.languages)}</p>
	</div>`
}

function markupList(country = []) {
	return country.map(
	   ({ flags, name }) =>
	`<p><img src=${flags.svg} width="20" alt=""> ${name.official}<p/>`
	 ).join('')
   } 

function newError(){
	Notiflix.Notify.failure("Oops, there is no country with that name");
}