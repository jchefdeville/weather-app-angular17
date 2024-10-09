import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  town = output<string | null>();
  weatherService = inject(WeatherService);
  
  form = new FormGroup({
    location: new FormControl('Niort')
  })

  onSubmit() {
    console.log(this.form);
    console.log(this.form.controls.location.value);

    this.town.emit(this.form.controls.location.value);

    this.form.reset();

    this.weatherService.callApi();
  }

}
