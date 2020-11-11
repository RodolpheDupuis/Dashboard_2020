import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            alignItems: 'center',
        },
    },
    icon: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    submit: {
        marginTop: '5vh'
    },
}));

function SignIn(props) {
    const {value, index} = props;
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleChange = async (event) => {
        alert('starfoullah');
    };

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    <Container minWidth="xs">
                        <Typography>
                            Sign in using your username
                        </Typography>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div className={classes.icon} style={{marginTop:"3vh"}}>
                                <PersonIcon fontSize="large"/>
                                <TextField
                                    required
                                    onChange={event => setUsername(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={username}
                                />
                            </div>
                            <div className={classes.icon}>
                                <VpnKeyIcon fontSize="large"/>
                                <TextField
                                    required
                                    onChange={event => setPassword(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    value={password}
                                />
                            </div>
                            <div className={classes.submit}>
                                <Button
                                    onClick={(event) => handleChange(event)}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </Container>
                </Box>
            )}
        </div>
      );
};

export default SignIn;