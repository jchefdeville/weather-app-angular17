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
        time: Date[];
        temperature2m: Float32Array;
        precipitationProbability: Float32Array;
        precipitation: Float32Array;
    }
};