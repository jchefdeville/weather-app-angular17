import { Component, input } from '@angular/core';
import { CurrentWeatherData } from '../../../model/weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-weather-result',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './current-weather-result.component.html',
  styleUrl: './current-weather-result.component.css'
})
export class CurrentWeatherResultComponent {

  currentWeatherData = input.required<CurrentWeatherData>();
}
