import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherForecastService } from '../weather-forecast.service';
import { WeatherData } from '../weather-data.model';
import { GeocodingService } from '../geocoding-service.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  town = output<string>();
  weatherData = output<WeatherData>();

  geocachingService = inject(GeocodingService);
  weatherForecastService = inject(WeatherForecastService);
  
  form = new FormGroup({
    location: new FormControl('Niort')
  })

  async onSubmit() {
    // console.log(this.form);

    this.town.emit(this.form.controls.location.value!);

    // this.form.reset();

    this.weatherData.emit(await this.weatherForecastService.callWeatherForescastApi());
  }

}
