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
		returnFetch(text).then(createCountryCard);
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
	} else if(country === 404){
		markup = '';
		Notiflix.Notify.failure("Oops, there is no country with that name");
		throw new error();
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

function markupList(event){
	let markup ='';
	event.forEach(element => {
		let {svg} = element.flags;
		markup += `<p><img src=${(svg)} width="20" alt=""> ${element.name.official}<p/>`;
	});
	return markup;	
  }

// Подскажите, пожалуйста, как сделать через map. Ниже то что я смог надумать и я уперся в два массива. Дальше не пойму куда идти
//   function markupList(event){
//   let flag = [];
//   const flagsArr = event.map(e => e.flags);
//   flagsArr.forEach(element => {
// 	  flag.push(element.svg);
//   });
//   markup = event.map(e => `<p><img src=${{??}} width="20" alt="">${e.name.official}<p/>`);
//}
