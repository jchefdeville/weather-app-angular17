import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationComponent } from "./location/location.component";
import { WeatherResultComponent } from "./weather-result/weather-result.component";
import { WeatherData } from './weather-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationComponent, WeatherResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app-angular17';
  
  town: string = ''; 
  weatherData: WeatherData | undefined;

  onTownReceveived($event: string) {
    this.town = $event;
  }

  onWeatherDataReceived($event: WeatherData) {
    this.weatherData = $event;
  }
}
