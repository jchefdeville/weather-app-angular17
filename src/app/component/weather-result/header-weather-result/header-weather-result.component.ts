import { Component, input } from '@angular/core';
import { CityResult } from '../../../model/weather-data.model';

@Component({
  selector: 'app-header-weather-result',
  standalone: true,
  imports: [],
  templateUrl: './header-weather-result.component.html',
  styleUrl: './header-weather-result.component.css'
})
export class HeaderWeatherResultComponent {

  city = input.required<CityResult>();
}
