import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectWeather, fetchWeather } from "../../features/weather";

function ResumeWeather() {
  const { cities, loading, weatherData } = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  const fetchWeatherForCurrentCity = () => {
    const currentCity = cities[currentCityIndex];
    dispatch(fetchWeather([currentCity]));
  };

  useEffect(() => {
    fetchWeatherForCurrentCity();

    const intervalId = setInterval(() => {
      setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 1 * 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.weather}>
          <div>
            <h2>{cities[currentCityIndex]}</h2>
            {weatherData[cities[currentCityIndex]] ? (
              <div>
                <p>
                  {weatherData[cities[currentCityIndex]].weather[0].description}
                </p>
                <p>
                  Temperatura: {weatherData[cities[currentCityIndex]].main.temp}
                  °C
                </p>
              </div>
            ) : (
              <p>
                Não foi possível carregar as informações para{" "}
                {cities[currentCityIndex]}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeWeather;
