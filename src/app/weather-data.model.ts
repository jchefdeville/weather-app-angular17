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

export type WeatherData = {
    current : {
        time: Date,
        temperature2m: number,
        isDay: number,
        precipitation: number,
        rain: number,
        weatherCode: number,
        windSpeed10m: number
    },
    hourly : {
        time: Date[],
        temperature2m: Float32Array,
        precipitationProbability: Float32Array,
        precipitation: Float32Array
    }
};
