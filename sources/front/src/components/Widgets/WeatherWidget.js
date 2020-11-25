import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Divider } from '@material-ui/core';
import {List, ListItem, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import iconWeather from './../../assets/icons/32/weather.png'
import iconSun from './../../assets/icons/weather/sun.png'
import iconCloudy from './../../assets/icons/weather/cloud.png'
import iconRain from './../../assets/icons/weather/rain.png'
import iconThunder from './../../assets/icons/weather/thunder.png'
import iconSnow from './../../assets/icons/weather/snow.png'
import iconMist from './../../assets/icons/weather/mist.png'


const API_KEY = "4a2cdbd6fa8bc32d50c64a41257ea373"

const useStyles = makeStyles((theme) => ({
    // List
    root: {
        width: '100%',
        maxWidth: '45vh',
        },
    item: {
        alignItems: 'flex-start',
        marginLeft: '6vh',
    },
    // Card
    card: {
        width: '25%',
        minHeight: '30vh',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
        borderRight: '1vh solid #5ea5de'
    },
    //Divs
    headerDiv: {
        marginTop: '0.5vh',
        marginLeft: '-20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleDiv: {
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1vh',
        marginBottom: '5vh',
    },
    // Buttons
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '95%',
        top: '-7%',
    },
    // Icons
    smallerIcon: {
        height: '2vh',
        width: '2vh',
    },
    icon: {
        height: '4.5vh',
        width: '4.5vh',
        marginRight: '3vh',
    },
    forecastIcon: {
        position: 'relative',
        marginTop: '0.5vh',
        right: '15%',
        height: '5.5vh',
        width: '5.5vh',
    },
    // Texts
    hour: {
        position: 'absolute',
        right: '10%'
    },
    cityName: {
        position: 'absolute',
        left: '10%'
    },
    temperature: {
        fontSize: '4vh',
        fontWeight: 'bold',
        marginLeft: '-3vh'
    },
    humidity: {
        position: 'absolute',
        fontSize: '2vh',
        marginTop: '13vh',
        left: '-10%'
    },
    description: {
        position: 'absolute',
        fontSize: '2vh',
        marginTop: '9vh',
        left: '-10%'
    },
}));

// CITY WEATHER
export default function WeatherForecast(props) {
    const classes = useStyles();
    const {city, canBeDeleted, refreshTime, widgetsArray, index} = props;
    const [isDeleted, setIsDeleted] = useState(false);
    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(0);
    const [conditionId, setConditionId] = useState(0);
    const date = new Date();
    const hour = date.getHours();

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    // GET CITY WEATHER
    const getWeather= async () => {

        // Get current weather
        const ret = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
            },
            method: 'GET'
        })
        setTemp(ret.data.main.temp);
        setDescription(ret.data.weather[0].description);
        setHumidity(ret.data.main.humidity);
        setConditionId(ret.data.weather[0].id)
    }
    // Call function once at start + each minute * refresh time
    useEffect(()=>{
        getWeather();
        setInterval(getWeather, 60000 * refreshTime);
    }, [])

    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                    disabled={isDeleted}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            {/* HEADER */}
            <div className={classes.headerDiv}>
                <img src={iconWeather} className={classes.icon}/>
                <Typography variant="h6">Weather Forecast</Typography>
            </div>
            <div className={classes.titleDiv}>
                <Typography variant="h4" className={classes.cityName} >{city}</Typography>
                <Typography variant="h4" className={classes.hour} >{hour} H</Typography>
            </div>
            {/* WEATHER INFOS */}
            <List className={classes.root}>
                <ListItem className={classes.item}>
                    <ListItemText disableTypography className={classes.temperature}>
                        {temp} °C
                    </ListItemText>
                    <ListItemText disableTypography className={classes.description}>
                       Weather: {description}
                    </ListItemText>
                    <ListItemText disableTypography className={classes.humidity}>
                        Humidity: {humidity} %
                    </ListItemText>
                    {/* DISPLAY CORRECT ICON */}
                    {conditionId <= 232 && (
                        <img src={iconThunder} className={classes.forecastIcon}/>
                    )}
                    {conditionId >= 300 && conditionId <= 531 && (
                        <img src={iconRain} className={classes.forecastIcon}/>
                    )}
                    {conditionId >= 600 && conditionId <= 622 && (
                        <img src={iconSnow} className={classes.forecastIcon}/>
                    )}
                    {conditionId >= 701 && conditionId <= 781 && (
                        <img src={iconMist} className={classes.forecastIcon}/>
                    )}
                    {conditionId == 800 && (
                        <img src={iconSun} className={classes.forecastIcon}/>
                    )}
                    {conditionId >= 801 && (
                        <img src={iconCloudy} className={classes.forecastIcon}/>
                    )}
                </ListItem>
            </List>
        </Card>
    </Draggable>
    );
}
