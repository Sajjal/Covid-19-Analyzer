const fs = require("fs");
const countries = "./data/countries.json";

async function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports.getCountries = async function(countryName) {
    if (countryName === "") {
        return "";
    }
    countryName = countryName.toLowerCase();

    let list = await readFile(countries);
    list = JSON.parse(list);

    for (let i = 0; i < list.length; i++) {
        if (countryName === list[i].name) {
            return list[i].url;
        }
    }
    return 0;
};