import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const apiKey = 'a451f947426a849b31078a854f4ef171';

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (cities: string[], { rejectWithValue }) => {
        try {
            const promises = cities.map(async (city) => {
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt&units=metric`;
                const response = await axios.get(url);
                return response.data;
            });
            return Promise.all(promises);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

interface WeatherData {
    [city: string]: {
        weather: { description: string }[];
        main: { temp: number };
    };
}

const initialState: {
    cities: string[];
    weatherData: WeatherData;
    loading: boolean;
    error: string | null;
} = {
    cities: ['Simoes Filho,BR', 'Sao Paulo,BR', 'Salvador,BR', 'Fortaleza,BR', 'Rio de Janeiro,BR', 'Curitiba,BR'],
    weatherData: {},
    loading: false,
    error: null
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                const { payload: weatherData } = action;
                weatherData.forEach((data, index) => {
                    state.weatherData[state.cities[index]] = data;
                });
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.loading = false;
                state.error = null;
            })
    }


});

export default weatherSlice.reducer;

export const selectWeather = (state: RootState) => state.weatherReducer
