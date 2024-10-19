export type CityResult = {
    name: string,
    admin2: string,
    admin1: string,
    latitude: number,
    longitude: number
}

export type GeocodingDataResults = {
    generationtime_ms: number,
    results: CityResult[]
}

export type CurrentWeatherData = {
    time: Date,
    temperature2m: number,
    isDay: number,
    precipitation: number,
    rain: number,
    weatherCode: number,
    windSpeed10m: number
}

export type HourlyWeatherData = {
    time: Date[],
    temperature2m: Float32Array,
    relativeHumidity2m: Float32Array,
    dewPoint2m: Float32Array,
    apparentTemperature: Float32Array,
    precipitation: Float32Array,
    rain: Float32Array,
    snowfall: Float32Array,
    weatherCode: Float32Array,
    pressureMsl: Float32Array,
    surfacePressure: Float32Array,
    cloudCoverLow: Float32Array,
    windSpeed10m: Float32Array,
    isDay: Float32Array,
    precipitationProbability: Float32Array
}

export type WeatherData = {
    current : CurrentWeatherData,
    hourly : HourlyWeatherData,
    daily : {
        time: Date[],
        sunrise: Float32Array,
        sunset: Float32Array,
        daylightDuration: Float32Array,
        sunshineDuration: Float32Array
    }
};
