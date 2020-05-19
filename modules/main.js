/****************Setting-Up-Environment***************** */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs") + app.engine("ejs", require("ejs").__express);
app.use(express.static("views"));

//routing
let port = process.env.PORT || 2000;
/****************************************************** */

let stats = require("./stats_scrapper");
let countries = require("./country_validator");

async function processData(country) {
    let data;
    let validate_country = await countries.getCountries(country);

    if (validate_country === "") {
        data = await stats.searchCases("");
    } else if (validate_country !== "" && validate_country !== 0) {
        data = await stats.searchCases(validate_country);
    } else {
        data = "";
    }
    return data;
}

module.exports = {
    renderHTML: async function() {
        app.get("*", async function(req, res) {
            let world_data = await processData("");
            let Nepal_data = await processData("Nepal");
            let USA_data = await processData("USA");
            res.render("index.ejs", {
                data: {
                    message: "Welcome!",
                    world: world_data,
                    Nepal: Nepal_data,
                    USA: USA_data,
                },
            });
        });

        app.post("/", async function(req, res) {
            let country = req.body.search;
            let data = await processData(country);

            if (data === "" || country === "") {
                res.render("not_found.ejs", {
                    data: { message: `${country} Not Found!` },
                });
            } else {
                res.render("search.ejs", {
                    result: {
                        message: `Status of ${country}`,
                        stats: data,
                    },
                });
            }
        });
        app.listen(port, function() {
            return console.log(`Listening on localhost:${port}`);
        });
    },
};