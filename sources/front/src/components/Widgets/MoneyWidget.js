import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    // Card
    card: {
        width: '20%',
        minHeight: '20vh',
        backgroundColor: '#f5f5f5',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
    },
    // Buttons
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '94%',
        top: '-8%',
    },
    // Icons
    smallerIcon: {
        height: '2vh',
        width: '2vh',
    },
}));

// MONEY COUNVERTER
export default function MoneyConverter(props) {
    const classes = useStyles();
    const {currency1, currency2, borderColor, canBeDeleted, refreshTime} = props;

    const destroyWidget = async () => {
        alert('vous me le bannez lui!');
    };

    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
        <Typography variant="h6">{currency1} - {currency2}</Typography>
        </Card>
    </Draggable>
    );
}
