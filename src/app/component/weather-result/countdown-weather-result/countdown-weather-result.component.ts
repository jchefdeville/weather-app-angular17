import { Component, input, output } from '@angular/core';
import { MinuteSecondsPipe } from '../../../pipe/minute-seconds.pipe';

@Component({
  selector: 'app-countdown-weather-result',
  standalone: true,
  imports: [MinuteSecondsPipe],
  templateUrl: './countdown-weather-result.component.html',
  styleUrl: './countdown-weather-result.component.css'
})
export class CountdownWeatherResultComponent {

  countdown = input.required<number>();

  refresh = output<boolean>();

  onClickRefresh() {
    this.refresh.emit(true);
  }
}
