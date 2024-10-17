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
  error: boolean;
  errorMsg: string | undefined = undefined;

  constructor() {
    this.error = false;
  }

  onCityReceveived($event: CityResult) {
    this.city = $event;
  }

  onError($event: boolean) {
    this.error = $event;
    this.errorMsg = 'error';
  }
}
