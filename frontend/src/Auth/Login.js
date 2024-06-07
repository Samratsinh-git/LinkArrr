import React, { useContext } from "react";
import { Grid, Paper, Typography, Avatar, Box, TextField, FormControlLabel, Checkbox, Button, Link, colors } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import bg6 from "./bg6.jpeg";
import Copyright from "../MainPages/Copyright";
import { HomeContext } from "../Context/context";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: 'url("https://picsum.photos/1920/1080")',
        backgroundSize: 'cover',
        backgroundBlendMode: 'screen',
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.45
    },
}));

function Login({ handleChange }) {
    // const [user, setUser] = useState({
    //     username: "", password: ""
    // });
    
    const [user, setUser] = useState([])

    const { link, setLink } = useContext(HomeContext);
    let name, value;
    const handleInputs = (event) => {
        // name = event.target.name;
        // value = event.target.value;
        // setUser({ ...user, [name]: value });
        setUser(values => ({...values,[event.target.name]:event.target.value}))
    }
    const history = useNavigate();
    async function submit() {
        try {
            console.log(user);
            // const { response } = await axios.post('http://localhost:5000/users/', user)
            const  res = await axios.post('http://localhost:5000/users/', user)
            // .then(res=>{
                console.log(res)
                if (res.data.data == "Login successful") {
                    localStorage.setItem("token", res.data.token);
                    setLink(res.data.user);
                    // console.log(res.data);
                    history("/home", { state: { user : res.data.user, id: res.data.user.name } });
                    console.log("Success")
                } else if (res.data.data === "Invalid Password") {
                    alert("Password Invalid")
                }
                else if (res.data.data === "User doesn't exist") {
                    alert("User not registered")
                }
                // console.log("Login successful: ", res.data);   
            // })

        } catch (error) {
            console.log("here")
            console.log(error.message);
        }
    }

    const classes = useStyles();
    const paperStyle = { padding: '20px 15px', width: 350, margin: "0px auto" }
    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }
    // const textPadding = {margin:"10px "}
    return (
        <Grid>
            <div className={classes.background}></div>
            <Paper elevation={18} style={paperStyle}>
                <Grid align="center">
                    <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}> <VerifiedUserIcon fontSize="large" /> </Avatar>
                    <Typography component="h1" variant="h5">Login</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleInputs}
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleInputs}
                                    name="password"
                                    align="left"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid xs={12} sx={{ mt: 3 }}>
                        <FormControlLabel labelPlacement="end"
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={<div style={{ textAlign: "left" }}>Remember me</div>}
                        />
                    </Grid>
                    <Button onClick={submit} type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 4, bgcolor: "secondary.main" }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs={6}>
                            <Link href="#">
                                Forgot Password
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href="#" onClick={() => handleChange('event', 1)} variant="body2">
                                No account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Grid2 sx={{ mt: 4 }}>
                <Copyright />
            </Grid2>
        </Grid>
    )
}
export default Login;