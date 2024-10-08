import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationComponent } from "./location/location.component";
import { WeatherResultComponent } from "./weather-result/weather-result.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationComponent, WeatherResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app-angular17';
  
  town: string | null = ''; 

  onTownReceveived($event: string | null) {
    console.log(`App component $event`);
    this.town = $event;
  }
}
