import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherData } from '../model/weather-data.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  params = {
    "latitude": 0,
    "longitude": 0,
    "current": ["temperature_2m", "is_day", "precipitation", "rain", "weather_code", "wind_speed_10m"],
    "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation", "rain", 
               "snowfall", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover_low", "wind_speed_10m", "is_day", "precipitation_probability"],
    "forecast_days": 1,
	  "daily": ["sunrise", "sunset", "daylight_duration", "sunshine_duration"],
    "timezone": "Europe/London", // 
    "models": "meteofrance_seamless",
    "format": 'json',
  };
  url = "https://api.open-meteo.com/v1/forecast";

  constructor() { }

  async callWeatherForescastApi(latitude: number, longitude: number) {
    this.params.latitude = latitude;
    this.params.longitude = longitude;

    console.log("fetchWeatherApi with latitude=" + latitude + ' and longitude=' + longitude);

    const responses = await fetchWeatherApi(this.url, this.params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    // console.log(JSON.stringify(response, null, 2));
    // console.log(response);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    console.log("utcOffsetSeconds=" + utcOffsetSeconds);

    const current = response.current()!;
    console.log("currentDate=" + new Date(Number(current.time()) * 1000));

    const hourly = response.hourly()!;
    console.log("hourlyDate=" + new Date(Number(hourly.time()) * 1000));
    console.log("hourly.interval()=" + hourly.interval());

    const daily = response.daily()!;


    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData: WeatherData = {
        current : {
          time: new Date((Number(current.time())) * 1000),
          temperature2m: current.variables(0)!.value(),
          isDay: current.variables(1)!.value(),
          precipitation: current.variables(2)!.value(),
          rain: current.variables(3)!.value(),
          weatherCode: current.variables(4)!.value(),
          windSpeed10m: current.variables(5)!.value()
        },
        hourly : {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => {
              const date = new Date((t + utcOffsetSeconds - 7200) * 1000); // TODO : hardcode 7200
              //console.log(date);

              return date;
            }
          ),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
          dewPoint2m: hourly.variables(2)!.valuesArray()!,
          apparentTemperature: hourly.variables(3)!.valuesArray()!,
          precipitation: hourly.variables(4)!.valuesArray()!,
          rain: hourly.variables(5)!.valuesArray()!,
          snowfall: hourly.variables(6)!.valuesArray()!,
          weatherCode: hourly.variables(7)!.valuesArray()!,
          pressureMsl: hourly.variables(8)!.valuesArray()!,
          surfacePressure: hourly.variables(9)!.valuesArray()!,
          cloudCoverLow: hourly.variables(10)!.valuesArray()!,
          windSpeed10m: hourly.variables(11)!.valuesArray()!,
          isDay: hourly.variables(12)!.valuesArray()!,
          precipitationProbability: hourly.variables(13)!.valuesArray()!
        }, 
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          sunrise: daily.variables(0)!.valuesArray()!,
          sunset: daily.variables(1)!.valuesArray()!,
          daylightDuration: daily.variables(2)!.valuesArray()!,
          sunshineDuration: daily.variables(3)!.valuesArray()!,
        },
      
    };

    console.log(weatherData);

    return weatherData;
  }
}
