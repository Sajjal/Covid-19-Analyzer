const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://www.worldometers.info/coronavirus/";

module.exports.searchCases = async function(country) {
    let searchFor;

    if (country === "") {
        searchFor = "";
    } else {
        searchFor = `country/${country}`;
    }

    return fetch(`${url}${searchFor}`)
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);
            let data = [];
            let finalData = [];

            //getting the numbers
            $(".maincounter-number").each(function(i, element) {
                const $element = $(element);
                let cases = $element.text();
                cases = cases.replace(/\s/g, "");

                cases = cases.split("\n");
                data.push(cases);
            });

            //getting the flag of the country
            $(".content-inner").each(function(i, element) {
                const $element = $(element);
                const $image = $element.find("h1 img");
                const image = [];
                image.push($image.attr("src"));
                data.push(image);
            });

            let total = parseInt(data[0][0].replace(/,/g, ""));
            let death = parseInt(data[1][0].replace(/,/g, ""));
            let recovered = parseInt(data[2][0].replace(/,/g, ""));
            let active = total - death - recovered;

            let flag;
            if (country === "") {
                flag = "./images/world.png";
            } else flag = "https://www.worldometers.info" + data[3][0];

            let covidStat = {
                total: total.toLocaleString(),
                death: death.toLocaleString(),
                recovered: recovered.toLocaleString(),
                active: active.toLocaleString(),
                flag: flag,
            };

            finalData.push(covidStat);
            return finalData[0];
        });
};