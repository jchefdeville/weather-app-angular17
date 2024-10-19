import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherInterpretation',
  standalone: true
})
export class WeatherInterpretationPipe implements PipeTransform {

    transform(code: number,  type: 'description' | 'icon'): string {
        const result: WeatherInterpretation = weatherInterpretation[code] || { description: 'Unknown', icon: 'wi-na' };

        return result[type];
    }

}

const weatherInterpretation: { [key: number]: WeatherInterpretation } = {
  0: { description: 'Clear sky', icon: 'wi-day-sunny' },
  1: { description: 'Mainly clear', icon: 'wi-day-sunny-overcast' },
  2: { description: 'Partly cloudy', icon: 'wi-day-cloudy' },
  3: { description: 'Overcast', icon: 'wi-cloudy' },
  45: { description: 'Fog', icon: 'wi-fog' },
  48: { description: 'Depositing rime fog', icon: 'wi-fog' },
  51: { description: 'Drizzle : Light', icon: 'wi-sprinkle' },
  53: { description: 'Drizzle : Moderate', icon: 'wi-showers' },
  55: { description: 'Drizzle : Dense intensity', icon: 'wi-showers' },
  56: { description: 'Freezing Drizzle : Light', icon: 'wi-sleet' },
  57: { description: 'Freezing Drizzle : Dense intensity', icon: 'wi-sleet' },
  61: { description: 'Rain : Slight', icon: 'wi-rain' },
  63: { description: 'Rain : Moderate', icon: 'wi-rain-wind' },
  65: { description: 'Rain : Heavy intensity', icon: 'wi-showers' },
  66: { description: 'Freezing Rain : Light', icon: 'wi-hail' },
  67: { description: 'Freezing Rain : Heavy intensity', icon: 'wi-hail' },
  71: { description: 'Snow fall : Slight', icon: 'wi-snow' },
  73: { description: 'Snow fall : Moderate', icon: 'wi-snow' },
  75: { description: 'Snow fall : Heavy intensity', icon: 'wi-snow' },
  77: { description: 'Snow grains', icon: 'wi-snowflake-cold' },
  80: { description: 'Rain showers : Slight', icon: 'wi-day-showers' },
  81: { description: 'Rain showers : Moderate', icon: 'wi-rain-mix' },
  82: { description: 'Rain showers : Violent', icon: 'wi-rain-wind' },
  85: { description: 'Snow showers : Slight', icon: 'wi-day-snow' },
  86: { description: 'Snow showers : Heavy', icon: 'wi-day-snow' },
  95: { description: 'Thunderstorm : Slight or moderate', icon: 'wi-thunderstorm' },
  96: { description: 'Thunderstorm : Slight', icon: 'wi-thunderstorm' },
  99: { description: 'Thunderstorm : Heavy hail', icon: 'wi-thunderstorm' }
};

type WeatherInterpretation = {
  description: string, 
  icon: string
}