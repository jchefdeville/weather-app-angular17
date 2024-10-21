import { Component, input, OnChanges, OnDestroy, output, SimpleChanges } from '@angular/core';
import { MinuteSecondsPipe } from '../../../pipe/minute-seconds.pipe';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-countdown-weather-result',
  standalone: true,
  imports: [MinuteSecondsPipe],
  templateUrl: './countdown-weather-result.component.html',
  styleUrl: './countdown-weather-result.component.css'
})
export class CountdownWeatherResultComponent implements OnChanges, OnDestroy {

  currentWeatherDataTime = input.required<Date>();
  
  countdown = 900; // 15 minutes = 900 seconds
  timerSubscription!: Subscription;

  refresh = output<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
      this.startCountdown(this.currentWeatherDataTime());
  }

  updateCountdown(currentWeatherDataTime: Date) {
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - currentWeatherDataTime.getTime();
    
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    this.countdown = 900 - differenceInSeconds;
  }

  startCountdown(dateResultAPI: Date) {
    this.updateCountdown(dateResultAPI);

    this.unsubscribeTimer();

    this.timerSubscription = interval(1000)
      .pipe(take(this.countdown))
      .subscribe(() => {
        this.countdown--;
      });
  }

  unsubscribeTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
      this.unsubscribeTimer();
  }

  onClickRefresh() {
    this.refresh.emit(true);
  }
}
