import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeocodingDataResults } from '../model/weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private httpClient = inject(HttpClient);

  private url = 'https://geocoding-api.open-meteo.com/v1/search?name=saintes&count=10&language=fr&format=json';
  
  constructor() { }

  callGeocodingApi(town: string) {

    this.httpClient.get<GeocodingDataResults>(this.url).subscribe({
      next: (resData) => {
        console.log(resData);

        return resData.results[0];
      }
    })
  }
}
