import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogTitle, DialogContent, Typography, CardActionArea, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import './AddWidget.css';
import iconYoutube from './../../assets/icons/64/youtube.png'
import iconSpotify from './../../assets/icons/64/spotify.png'
import iconGithub from './../../assets/icons/64/github.png'
import iconWeather from './../../assets/icons/64/weather.png'
import iconMoney from './../../assets/icons/64/money.png'
// Widgets Imports
import {YoutubeSubCount, YoutubeLastVideo} from '../Widgets/YoutubeWidgets';
import {SpotifyArtistSongs, SpotifyUserPlaylists} from '../Widgets/SpotifyWidgets';
import {GithubUserRepos, GithubRepoPushs} from '../Widgets/GithubWidgets';
import MoneyConverter from '../Widgets/MoneyWidget';
import WeatherForecast from '../Widgets/WeatherWidget';


const useStyles = makeStyles((theme) => ({
    // Dialog
    dialogCard: {
        position: 'absolute',
        top: '20%',
        width: '55vh',
    },
}));

// CHOOSE WIDGET
function WidgetSelection(props) {
    const {title, subtitle, widget1, widget2, icon, displayWidgets, setDisplayWidgets} = props;

    const [openConfig, setOpenConfig] = useState(false);
    const [type, setType] = useState(0);

    const handleConfig = (newType) => {
        setType(newType);
        setOpenConfig(true);
    }

    return (
        <div>
            {openConfig === false && (
                <div>
                    {/* HEADER */}
                    <DialogTitle>
                    <div className="header">
                        <h1 className="title">{title}</h1>
                        <h2 className="subTitle">{subtitle}</h2>
                    </div>
                    </DialogTitle>
                    {/* 1ST WIDGET */}
                    <DialogContent dividers>
                        <Card className="serviceCard" variant="outlined" >
                            <CardActionArea className="serviceCardAction" onClick={() => handleConfig(0)}>
                                <img src={icon} className="widgetIcon"/>
                                <Typography className="serviceText">{widget1}</Typography>
                            </CardActionArea>
                        </Card>
                    {/* 2ND WIDGET */}
                        <Card className="serviceCard" variant="outlined">
                            <CardActionArea className="serviceCardAction" onClick={() => handleConfig(1)}>
                                <img src={icon} className="widgetIcon"/>
                                <Typography className="serviceText">{widget2}</Typography>
                            </CardActionArea>
                        </Card>
                    </DialogContent>
                </div>
            )}
            {openConfig === true && (
                <WidgetConfig
                    type={type}
                    title={title}
                    subtitle="Configuration"
                    icon={icon} label="Name"
                    global={title}
                    displayWidgets={displayWidgets}
                    setDisplayWidgets={setDisplayWidgets}
                />
            )}
        </div>
    )
}

// CONFIG SELECTED WIDGET
function WidgetConfig(props) {
    const {type, title, subtitle, icon, label, global, displayWidgets, setDisplayWidgets} = props;
    const [name, setName] = useState('');

    var tmp = [...displayWidgets];

    const createWidget = (type, title, name) => {
        if (title === "YouTube") {
            if (type === 0) {
                tmp.push({name: "youtube-subcount", content: <YoutubeSubCount youtuber={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
            if (type === 1) {
                tmp.push({name: "youtube-video", content: <YoutubeLastVideo youtuber={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
        }
        if (title === "Spotify") {
            if (type === 0) {
                tmp.push({name: "spotify-artist", content: <SpotifyArtistSongs artist={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
            if (type === 1) {
                tmp.push({name: "spotify-playlist", content: <SpotifyUserPlaylists user={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
        }
        if (title === "Github") {
            if (type === 0) {
                tmp.push({name: "github-user", content: <GithubUserRepos user={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
            if (type === 1) {
                tmp.push({name: "github-repo", content: <GithubRepoPushs repo={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
        }
        console.log(displayWidgets.length);
    }

    return (
        <div>
            {/* HEADER */}
            <DialogTitle>
                <div className="header">
                    <h1 className="title">{title}</h1>
                    <h2 className="subTitle">{subtitle}</h2>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Card className="serviceCard" variant="outlined">
                    <img src={icon} className="serviceIcon"/>
                    <TextField
                        required
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        id="name"
                        label={label}
                        name="name"
                        value={name}
                    />
                </Card>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createWidget(type, title, name)}
                >
                    Create widget
                </Button>
            </DialogContent>
        </div>
    )
}

// MAIN POPUP
export default function AddWidget(props) {
    const classes = useStyles();
    const {
        openWidgetAdder,
        setOpenWidgetAdder,
        displayWidgets,
        setDisplayWidgets
    } = props;

    const [showYoutube, setShowYoutube] = useState(false);
    const [showSpotify, setShowSpotify] = useState(false);
    const [showGithub, setShowGithub] = useState(false);
    const [showWeather, setShowWeather] = useState(false);
    const [showMoney, setShowMoney] = useState(false);

    const [mainView, setMainView] = useState(true);

    // CLOSE POPUP
    const handleClose = () => {
        setShowYoutube(false);
        setShowSpotify(false);
        setShowGithub(false);
        setShowWeather(false);
        setShowMoney(false);
        setOpenWidgetAdder(false);
        setMainView(true);
    }

    // SELECT YOUTUBE SERVICE
    const handleYoutubeClick = () => {
        setShowYoutube(true);
        setMainView(false);
    }

    // SELECT SPOTIFY SERVICE
    const handleSpotifyClick = () => {
        setShowSpotify(true);
        setMainView(false);
    }

    // SELECT GITHUB SERVICE
    const handleGithubClick = () => {
        setShowGithub(true);
        setMainView(false);
    }

    // SELECT WEATHER SERVICE
    const handleWeatherClick = () => {
        setShowWeather(true);
        setMainView(false);
    }

    // SELECT MONEY SERVICE
    const handleMoneyClick = () => {
        setShowMoney(true);
        setMainView(false);
    }

    console.log(mainView);
    return (
        <StylesProvider>
            <Dialog
                open={openWidgetAdder}
                onClose={handleClose}
                fullWidth={true}
                classes={{paper: classes.dialogCard}}
            >
                { mainView === true && (
                    <div>
                    {/* TITLE */}
                    <DialogTitle>
                        <div className="header">
                            <h1 className="title">Add a new widget</h1>
                            <h2 className="subTitle">Select service</h2>
                        </div>
                    </DialogTitle>
                    {/* CONTENT */}
                    <DialogContent dividers>
                        {/* YOUTUBE SERVICE */}
                        <Card className="serviceCard" variant="outlined" >
                            <CardActionArea className="serviceCardAction" onClick={handleYoutubeClick}>
                                <img src={iconYoutube} className="serviceIcon"/>
                                <div className="servicePos">
                                    <Typography className="serviceText">YouTube</Typography>
                                </div>
                            </CardActionArea>
                        </Card>
                        {/* SPOTIFY SERVICE */}
                        <Card className="serviceCard" variant="outlined">
                            <CardActionArea className="serviceCardAction" onClick={handleSpotifyClick}>
                                <img src={iconSpotify} className="serviceIcon"/>
                                <div className="servicePos">
                                    <Typography className="serviceText">Spotify</Typography>
                                </div>
                            </CardActionArea>
                        </Card>
                        {/* GITHUB SERVICE */}
                        <Card className="serviceCard" variant="outlined">
                            <CardActionArea className="serviceCardAction" onClick={handleGithubClick}>
                                <img src={iconGithub} className="serviceIcon"/>
                                <div className="servicePos">
                                    <Typography className="serviceText">Github</Typography>
                                </div>
                            </CardActionArea>
                        </Card>
                        {/* WEATHER SERVICE */}
                        <Card className="serviceCard" variant="outlined">
                            <CardActionArea className="serviceCardAction" onClick={handleWeatherClick}>
                                <img src={iconWeather} className="serviceIcon"/>
                                <div className="servicePos">
                                    <Typography className="serviceText">Weather</Typography>
                                </div>
                            </CardActionArea>
                        </Card>
                        {/* MONEY SERVICE */}
                        <Card className="serviceCard" variant="outlined">
                            <CardActionArea className="serviceCardAction"onClick={handleMoneyClick}>
                                <img src={iconMoney} className="serviceIcon"/>
                                <div className="servicePos">
                                    <Typography className="serviceText">Money</Typography>
                                </div>
                            </CardActionArea>
                        </Card>
                    </DialogContent>
                </div>
                )}
                {/* SELECT WIDGETS TO DISPLAY */}
                {showYoutube === true && (
                    <WidgetSelection
                        title="YouTube"
                        subtitle="Select Widget"
                        widget1="Subscribers count"
                        widget2="Last video"
                        icon={iconYoutube}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                    />
                )}
                {showSpotify === true && (
                    <WidgetSelection
                        title="Spotify"
                        subtitle="Select Widget"
                        widget1="Artist's top songs"
                        widget2="User's public playlists"
                        icon={iconSpotify}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                    />
                )}
                {showGithub === true && (
                    <WidgetSelection
                        title="Github"
                        subtitle="Select Widget"
                        widget1="User's public repositories"
                        widget2="Repository last commits"
                        icon={iconGithub}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                    />
                )}
            </Dialog>
        </StylesProvider>
    );
}