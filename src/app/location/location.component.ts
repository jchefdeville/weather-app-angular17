import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CityResult, GeocodingDataResults, WeatherData } from '../weather-data.model';
import { GeocodingService } from '../geocoding-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  city = output<CityResult | undefined>();
  error = output<boolean>();
  weatherData = output<WeatherData>();

  private latitude = 0;
  private longitude = 0;
  
  private httpClient = inject(HttpClient);

  geocachingService = inject(GeocodingService);
  
  form = new FormGroup({
    location: new FormControl('Niort')
  })

  async onSubmit() {
    // console.log(this.form);

    this.error.emit(false);

    const cityLocation = this.form.controls.location.value!;

    // Add a validator ?
    if (!cityLocation) {
      this.city.emit(undefined);
      return;
    }

    console.log("location=" + cityLocation);

    // this.form.reset();

    const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + cityLocation + '&count=10&language=fr&format=json';

    this.httpClient.get<GeocodingDataResults>(url).subscribe({
      next: (resData) => {
        console.log(resData);

        if (!resData.results) {
          this.error.emit(true);
          return;
        }

        const cityResult = resData.results[0];
        this.latitude = cityResult.latitude;
        this.longitude = cityResult.longitude;

        this.city.emit(cityResult);
      }
    })
  }

}
