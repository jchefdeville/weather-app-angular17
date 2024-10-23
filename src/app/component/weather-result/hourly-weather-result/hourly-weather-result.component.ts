import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { HourlyWeatherData } from '../../../model/weather-data.model';
import { CommonModule } from '@angular/common';
import { WeatherInterpretationPipe } from '../../../pipe/weather-interpretation.pipe';

@Component({
  selector: 'app-hourly-weather-result',
  standalone: true,
  imports: [CommonModule, WeatherInterpretationPipe],
  templateUrl: './hourly-weather-result.component.html',
  styleUrl: './hourly-weather-result.component.css'
})
export class HourlyWeatherResultComponent implements OnChanges {
  
  hourlyWeatherData = input.required<HourlyWeatherData>();
  
  now = new Date();

  selectedDay: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

  ngOnChanges(changes: SimpleChanges): void {
    this.now = new Date();
    
    if (this.hourlyWeatherData && this.hourlyWeatherData.length > 0) {
      const data = this.hourlyWeatherData();
      this.minDate = new Date(data.time[0]);
      this.maxDate = new Date(data.time[data.time.length - 1]);
      this.selectedDay = this.minDate;
    }
  }

  changeDay(delta: number): void {
    console.log("changeDay=" + delta);
    const newDate = new Date(this.selectedDay);
    newDate.setDate(this.selectedDay.getDate() + delta);

    if (newDate >= this.minDate && newDate <= this.maxDate) {
      this.selectedDay = newDate;
    }
  }

  isPreviousDayDisabled(): boolean {
    return this.selectedDay <= this.minDate;
  }

  isNextDayDisabled(): boolean {
    return this.selectedDay >= this.maxDate;
  }

}
