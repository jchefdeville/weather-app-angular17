import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationComponent } from "./location/location.component";
import { WeatherResultComponent } from "./weather-result/weather-result.component";
import { CityResult, WeatherData } from './weather-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationComponent, WeatherResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app-angular17';
  
  city: CityResult | undefined; 
  weatherData: WeatherData | undefined;

  onCityReceveived($event: CityResult) {
    this.city = $event;
  }

  onWeatherDataReceived($event: WeatherData) {
    this.weatherData = $event;
  }
}
