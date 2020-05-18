//This module is only used once to get the list of Countries and their url in WorldOMeter.
//The records are stored in a file: "/data/countries.json".

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");

let writeCountriesName = fs.createWriteStream("./data/countries.json");

const url = "https://www.worldometers.info/coronavirus/";

function searchCountry() {
    return fetch(`${url}`)
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);
            let countries = [];
            $(".mt_a").each(function(i, element) {
                const $element = $(element);
                let countryUrl = $element.attr("href");
                let countryName = $element.text().toLowerCase();
                countryUrl = countryUrl.replace(/country\//g, "").replace(/\//g, "");

                let countrylist = {
                    url: countryUrl,
                    name: countryName,
                };
                countries.push(countrylist);
            });

            //remove duplicate entries
            let removeDuplicate = [
                ...new Map(countries.map((item) => [item.name, item])).values(),
            ];

            //now save everything to a json file
            let formattedList = JSON.stringify(removeDuplicate, null, 4);
            writeCountriesName.write(formattedList);
            console.log("Data saved to JSON file.");
        });
}
searchCountry();