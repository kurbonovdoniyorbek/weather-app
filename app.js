const API_KEY = "644f6ce0ca9e401ebb891832211707";
const POSITION = "Namangan";

(function () {
  axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${POSITION}&days=7&aqi=yes&alerts=yes`
    )
    .then((result) => getData(result.data))
    .catch((err) => console.log(err));
})();

search.addEventListener("keyup", () => {
  axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${search.value}&days=7&aqi=yes&alerts=yes`
    )
    .then((result) => getData(result.data))
    .catch((err) => console.log(err));
});
function getData(data) {
  position.innerHTML = data.location.name;
  general_location.innerHTML =
    data.location.region + " | " + data.location.country;
  temp.innerHTML = data.current.temp_c + " " + `<sup>o</sup>C`;
  condition.innerHTML = data.current.condition.text;
  date.innerHTML = data.current.last_updated;
  icon.src = "https:" + data.current.condition.icon;

  console.log(data);

  const tomorrow = data.forecast.forecastday;
  forecast.innerHTML = "";
  tomorrow.forEach((day) => {
    const kun = document.createElement("div");
    kun.className = "day";
    kun.innerHTML = `<h1>${day.date}</h1>
    <p>Average Temperature in this day</p>
    <div class="scala">
      <div style="transform: translate(${day.day.avgtemp_c * 5
      }px)" class="circle">
      <p class="temp"> ${String(day.day.avgtemp_c).padEnd(4, ".0")}</p>
      </div>
      </div>
      
      <div class = "forecast_titles">
        <p>Humidity</p>
        <p>Pressure</p>
        <p>Wind</p>
      </div>
      
      <div class="forecast_options">
      
      <div class = "humidity_wrapper">
        <div class = "circle_humidity">
          <div class = "humidity_percent">
            <p>${day.day.avghumidity}%</p>
          </div>
          <div class = "hum_diagram" style = "height:${day.day.avghumidity
      }%"></div>
        </div>
      </div>

      <div class = "pressure_wrapper">
          <p>${day.hour[0].pressure_mb} hPa</p>
      </div>

      <div class="forecast_wind">
      <div style = "transform: rotate(${day.hour[0].wind_degree
      }deg)" class="arrow"></div>
        <div class = "wind_info">
          <p>${day.hour[0].wind_kph}</p> 
          <p>km/h</p>
        </div>
      </div>


      </div>

      <div class = "day_temp_wrapper">
        <div class = "day_condition">
          <img id="icon_day" src="${day.day.condition.icon}" />
          <h3>${day.day.condition.text}</h3>
        </div>
        <div class = "day_temp">
          <p>Temperature:</p>
          ${day.day.avgtemp_c}
          <i class="fa-solid fa-temperature-high"></i> 
        </div>
      
      </div>
      
    `;
    forecast.appendChild(kun);
  });


  const time = data.forecast.forecastday[0].hour.map(h => h.time.split(" ")[1])
  const temps = data.forecast.forecastday[0].hour.map(h => h.temp_c)
  let maxTemp = Math.max(...temps);
  let placeOfMaxTemp = temps.indexOf(maxTemp);
  console.log(maxTemp)
  console.log(temps)
  console.log(placeOfMaxTemp)
  // temps.splice(placeOfMaxTemp, 1, {
  //   y: maxTemp,
  //   marker: {
  //       symbol: 'url(./fl.png)'
  //   }
  // })

  if (Math.sign(maxTemp) === -1) {
    temps.splice(placeOfMaxTemp, 1, {
      y: maxTemp,
      marker: {
        symbol: 'url(./src/f2.png)'
      }
    })
  }
  else {
    temps.splice(placeOfMaxTemp, 1, {
      y: maxTemp,
      marker: {
        symbol: 'url(./src/fl.png)'
      }
    })
  }


  Highcharts.chart('container', {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Daily Average Temperature'
    },
    subtitle: {
      text: 'Doniyorjon'
    },
    xAxis: {
      categories: time
    },
    yAxis: {
      title: {
        text: 'Temperature'
      },
      labels: {
        formatter: function () {
          return this.value + '°';
        }
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#ffffff62',
          lineWidth: 2
        }
      }
    },
    series: [{
      name: data.location.name,
      marker: {
        symbol: 'circle'
      },
      data: temps

    }]
  });
  console.log(temps.splice(placeOfMaxTemp, placeOfMaxTemp, {
    y: 30,
    marker: {
      symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
    }
  }))
}



clear.addEventListener("click", () => {
  search.value = "";
});
