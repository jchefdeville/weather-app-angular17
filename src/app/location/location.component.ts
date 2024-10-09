import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../weather-data.model';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  town = output<string | null>();
  weatherData = output<WeatherData>();

  weatherService = inject(WeatherService);
  
  form = new FormGroup({
    location: new FormControl('Niort')
  })

  async onSubmit() {
    console.log(this.form);
    console.log(this.form.controls.location.value);

    this.town.emit(this.form.controls.location.value);

    this.form.reset();

    this.weatherData.emit(await this.weatherService.callApi());
  }

}
