const weatherData = {
    values: {
        Temp: null,
        Wind: null,
        Humidity: null,
        Precip: null,
        Pressure: null
    },

    units: {
        TempC: "°C",
        TempF: "°F",
        Wind: " mph",
        Humidity: "%",
        Precip: " mm",
        Pressure: " mbar"
    },

    labels: {
        Temp: "Temp",
        Wind: "Wind",
        Humidity: "Humidity",
        Precip: "Precip",
        Pressure: "Baro. Press"
    },

    setValues(temp, wind, humidity, precip, pressure) {
        this.values.Temp = temp;
        this.values.Wind = wind;
        this.values.Humidity = humidity;
        this.values.Precip = precip;
        this.values.Pressure = pressure;
    }, 

    formatData(key) {
        if(key == "Temp") {
            return this.labels[key] + ": " + 
                celiusToFahrenheit(this.values.Temp) + this.units.TempF + 
                " (" + this.values.Temp + this.units.TempC + ")";
        }
        return this.labels[key] + ": " + this.values[key] + this.units[key];
    },
    
    outputData() {
        output = "";
        //     "<p>Temp: " + celiusToFahrenheit(this.Temp) + "ºF (" + this.Temp + "°C)<br>" +
        //     "Wind: " + this.Wind + " mph<br>" +
        //     "Humidity: " + this.Humidity + "%<br>" +
        //     "Precip: " + this.Precip + " mm<br>" +
        //     "Baro. Press: " + this.Pressure + " mbar</p>";
        let i = 0;
        for(key in this.values) {
            if(i%2 == 0) {
                output += "<div class='data midblue'>" + this.formatData(key) + "</div>";
            } else {
                output += "<div class='data blue'>" + this.formatData(key) + "</div>";
            }
            i++;
        }
        return output;
    }
}

function celiusToFahrenheit(celius) {
    return celius * 9 / 5 + 32;
}

function parseWeatherData(json) {
    weatherData.setValues(
        json.sensors.AirTemp,
        json.sensors.WindSpeed,
        json.sensors.RelHumid,
        json.sensors.Rain,
        json.sensors.BaroPressure
    );
}

// https://colabprod01.pace.edu/api/influx/sensordata/Odin

fetch('https://vulcan.seidenberg.pace.edu/~escolab/weather-widget/apiCall.php')
    .then((response) => response.json())
    .then((json) => {
        parseWeatherData(json);
        document.querySelector("#weather").innerHTML = weatherData.outputData();
    });