import { React, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {"Tenbes "}
      {new Date().getFullYear()}
     {/* {'.'} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://live.staticflickr.com/3683/10351588545_211b9ed61a_n.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover', // cover
    backgroundPosition: 'center' //center
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const classes = useStyles();

  const signInChangeHandler = async () => {

    const url = 'http://localhost:8080/login'; 

    const response = await fetch(url, 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: email, pass: pass})
        })
        const data = await response.json(); // response.json() - for objects, response.text() - for string
        
        if(data !== null){
          let userId = data.id;
          //let userName = data.username;

          // local storage for persistence
          // where log out is - have localstorage.remove('username') or .clear
          // localstorage.getItem('username') - > to get username
          //localStorage.setItem('userName', userName);
          localStorage.setItem('userId', userId);               

          history.push({ 
            pathname: '/home',
            username: data.username,
            userId: data.id
          });
        }
    }
    //.catch(error => console.error(error))


  const handleEmailChange = (e) =>{
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  const handlePassChange = (e) => {
    console.log(e.target.value);
    setPass(e.target.value);
  }

  return (

    <Grid container component="main" className={classes.root}>

      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.pink}>
            T
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined" // outlined
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
              onChange={handlePassChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              //type="submit"
              onClick={signInChangeHandler}
              fullWidth
              variant="contained"
              color="primary"
              //className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>

    </Grid>
  );
}