import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherData } from './weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  params = {
    "latitude": 46.3231,
    "longitude": -0.4588,
    "hourly": "temperature_2m,precipitation_probability,precipitation",
    "forecast_days": 1,
    "format": 'json'
  };
  url = "https://api.open-meteo.com/v1/forecast";

  constructor() { }

  async callApi() {
    const responses = await fetchWeatherApi(this.url, this.params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    console.log(response);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly()!;
    console.log(hourly);

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData: WeatherData = {

      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      precipitationProbability: hourly.variables(1)!.valuesArray()!,
		  precipitation: hourly.variables(2)!.valuesArray()!,
    };

    console.log(weatherData);

    return weatherData;
  }
}
