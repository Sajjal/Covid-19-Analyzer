window.onload = function() {
    let dataChart = document.getElementById("dataChart").getContext("2d");
    let nation;
    let country = document
        .getElementById("notification")
        .innerHTML.trim()
        .toUpperCase()
        .split(" ")
        .splice(-1);

    if (country[0] === "WELCOME!") {
        nation = "Global";
    } else {
        nation = country;
    }

    let total = this.document
        .getElementById("total")
        .innerHTML.replace(/[ ,]/g, "");
    let death = this.document
        .getElementById("death")
        .innerHTML.replace(/[ ,]/g, "");
    let recovered = this.document
        .getElementById("recovered")
        .innerHTML.replace(/[ ,]/g, "");
    let active = this.document
        .getElementById("active")
        .innerHTML.replace(/[ ,]/g, "");

    // Global Options
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = "#777";

    new Chart(dataChart, {
        type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ["Total", "Death(s)", "Recovered", "Active"],
            datasets: [{
                label: "Stats",
                data: [total, death, recovered, active],
                backgroundColor: ["#FF9633", "#FF3F33", "#33A5FF", "#FF33B8"],
                borderWidth: 1,
                borderColor: "#777",
                hoverBorderWidth: 3,
                hoverBorderColor: "#000",
            }, ],
        },
        options: {
            title: {
                display: true,
                text: `${nation} Covid-19 Statistics`,
                fontSize: 25,
            },
            legend: {
                display: false,
                position: "right",
                labels: {
                    fontColor: "#000",
                },
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0,
                },
            },
            tooltips: {
                enabled: true,
            },
        },
    });
};