import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges {

    town = input.required();

    ngOnChanges(changes: SimpleChanges): void {
      console.log(this.town());
    }
}
