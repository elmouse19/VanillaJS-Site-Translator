import { LangCodes, LangTexts } from './lang.js';

var vjstCodes = LangCodes;
var vjstLangTexts = LangTexts;
var vjstLangInUse;

var vjst = function ({
	langSelectorMenu = 'vjstMenuLangSelector',
	langSelectorItem = 'vjstMenuItem',
	stringAttribute = 'data-vjst-text',
	chosenLang = 'English',
	vjstStrings = vjstLangTexts,
} = {}) {
	const root = document.documentElement;

	var listOfLanguages = Object.keys(vjstStrings[0]);
	vjstLangInUse = chosenLang;

	// Lang menu
	(function createMLDrop() {
		var vjstMenuLangSelector = document.getElementById(langSelectorMenu);
		
		// Reset the menu
		vjstMenuLangSelector.innerHTML = '';
		// Now build the options
		listOfLanguages.forEach((lang, langidx) => {
			var searchLang = LangCodes.find((langCode) => langCode.code == lang);

			let vjstLangItem = document.createElement('li');
			vjstLangItem.className = langSelectorItem;
			vjstLangItem.setAttribute('data-lang', searchLang.code);
			vjstLangItem.textContent = searchLang.name;
			vjstMenuLangSelector.appendChild(vjstLangItem);
			if (lang === chosenLang) {
				vjstMenuLangSelector.value = lang;
			}
		});

		vjstMenuLangSelector.addEventListener('click', event => {
			if (event.target && event.target.classList.contains(langSelectorItem))
			{
				vjstLangInUse = event.target.getAttribute('data-lang');
				resolveAllvjstStrings();
			}
		});

	})();

	function resolveAllvjstStrings() {
		let stringsToBeResolved = document.querySelectorAll(`[${stringAttribute}]`);
		stringsToBeResolved.forEach(stringToBeResolved => {
			let originaltextContent = stringToBeResolved.textContent;
			let resolvedText = resolveVJSTString(originaltextContent, vjstStrings);
			stringToBeResolved.textContent = resolvedText;
		});
	}
};


function resolveVJSTString(stringToBeResolved, langs) {
	var matchingStringIndex = langs.find(function (stringObj) {
		// Create an array of the objects values:
		let stringValues = Object.values(stringObj);
		// Now return if we can find that string anywhere in there
		return stringValues.includes(stringToBeResolved);
	});

	console.log(matchingStringIndex[vjstLangInUse])

	if (matchingStringIndex) {
		return matchingStringIndex[vjstLangInUse];
	} else {
		// If we don't have a match in our language strings, return the original
		return stringToBeResolved;
	}
}

vjst({
	langSelectorMenu: 'vjstMenuLangSelector',
	langSelectorItem: 'li',
	stringAttribute: 'data-vjst-text',
	chosenLang: 'Español',
	vjstStrings: vjstLangTexts,
});