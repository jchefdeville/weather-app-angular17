import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationComponent } from "./component/location/location.component";
import { WeatherResultComponent } from "./component/weather-result/weather-result.component";
import { CityResult, WeatherData } from './model/weather-data.model';

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
