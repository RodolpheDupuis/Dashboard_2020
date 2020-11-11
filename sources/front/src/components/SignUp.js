import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import userRequests from '../apiConnector';

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

function SignUp(props) {
    const {value, index} = props;
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleChange = async (event) => {
        alert('starfoullah');
    };

    const newUser = (email, password, username) => {
        userRequests.addUserDatabase(email, password, username);
    }

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
                            Create your account
                        </Typography>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div className={classes.icon}>
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
                                <AccountCircleIcon fontSize="large"/>
                                <TextField
                                    required
                                    onChange={event => setEmail(event.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
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
                                    onClick={() => newUser(email, password, username)}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="button-submit"
                                    component={Link} to={'/home'}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </Container>
                </Box>
            )}
        </div>
      );
};

export default SignUp;