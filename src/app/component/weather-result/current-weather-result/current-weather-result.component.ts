import { Component, input, output } from '@angular/core';
import { CurrentWeatherData } from '../../../model/weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MinuteSecondsPipe } from '../../../pipe/minute-seconds.pipe';

@Component({
  selector: 'app-current-weather-result',
  standalone: true,
  imports: [DatePipe, MinuteSecondsPipe, CommonModule],
  templateUrl: './current-weather-result.component.html',
  styleUrl: './current-weather-result.component.css'
})
export class CurrentWeatherResultComponent {

  currentWeatherData = input.required<CurrentWeatherData>();
  countdown = input.required<number>();

  refresh = output<boolean>();

  onClickRefresh() {
    this.refresh.emit(true);
  }
}
