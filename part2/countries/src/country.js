import axios from "axios";
import { useEffect, useState } from "react"
const Country = ({props}) => {
    //console.log(props);
    const [show, setShow] = useState(false);

    const invertShow = () => setShow(!show)
    // do we really need useEffect here???
    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const coordinates = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${props.capital}&appid=${process.env.REACT_APP_API_KEY}`);
                console.log(coordinates);
                if(coordinates.data.length>0) getWeatherData(coordinates.data[0].lat, coordinates.data[0].lon);
                else throw new Error(`couldn't fetch data for ${props.name.common}`);
            } catch (error) {
                console.log(error);
            }
        }
        
        const getWeatherData = async (lat, lon) => {
            try {
                const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
                console.log(weatherData);
                props['weatherData'] = {
                    temperature: weatherData.data.main.temp,
                    icon: weatherData.data.weather[0].icon,
                    wind: weatherData.data.wind.speed
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getCoordinates();
    });
    
    return (
        <>
            {show ? null : props.name.common}
            <button onClick={invertShow}>
                {show ? 'hide' : 'show'}
            </button>
            {show ? <Expand props={props}/> : null}
        </>
    )
}

const Expand = ({props}) => {
    //console.log(props.languages);
    // const displayIcon = async () => {
    //     try {
    //         const icon = await axios.get(`http://openweathermap.org/img/wn/${props.weatherData.icon}@2x.png`);
    //         console.log(icon);
    //         setImage(icon.data);      
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }    

    return (
        <div>
                <h2>{props.name.common}</h2>
            <br/>
                capital: {props.capital}
            <br/>
                area: {props.area}
            <br/>
                languages:
            <ul>
                {Object.values(props.languages).map((value, index) =>
                    <li key={index}>
                        {value}
                    </li>
                )}
            </ul>
            <br/>
                {(props.flag)}
            <br/>
                <h3>Weather in {props.name.common}</h3>
            <br/>
                temperature: {props.weatherData.temperature}
            <br/>
                <img src={`http://openweathermap.org/img/wn/${props.weatherData.icon}@2x.png`} alt='current weather icon'></img>   
            <br/>
                wind: {props.weatherData.wind} m/s
        </div>
    )
}

export default Country;