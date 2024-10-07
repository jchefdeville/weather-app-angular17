import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./input/input.component";
import { WeatherResultComponent } from "./weather-result/weather-result.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, WeatherResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app-angular17';
}
