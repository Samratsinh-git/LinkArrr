import React from "react";
import { useState } from "react";
import { Grid, Paper, Typography, Avatar, Box, TextField, FormControlLabel, Checkbox, Button, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import bg6 from "./bg6.jpeg";
import Copyright from "../MainPages/Copyright";

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

function SignUp({handleChange}) {
    const [user,setUser] = useState({
        name: "", username: "", email: "", password: ""
    });

    let name,value;
    const handleInputs = (event)=>{
        name = event.target.name; //for field, i.e in which field user is typing....
        value = event.target.value; // for the value inside the field...

        setUser({...user, [name]:value});//here the [name] fetches the field say email and stores the respective value in email field(state).
    }
    const history = useNavigate();
    async function submit(){
        try {
            const {response} = await axios.post('http://localhost:5000/users/add',user)

            .then(res=>{
                if (res.data == "User already exists") {
                    alert("User already exists")
                } else if(res.data == "Error") {
                    // history("/home",{state:{id:user.username}})
                    console.log("Error creating user")
                }
                else {
                    console.log("user created")
                    handleChange('event',0)
                }
            })
            console.log("User Created: ", response.data);
            
        } catch (error) {
            console.log(error);
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
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}> <AccountCircleIcon fontSize="large" /> </Avatar>
                    <Typography component="h1" variant="h5">Sign up</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={user.name}
                                    onChange={handleInputs}
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={user.username}
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
                                    value={user.email}
                                    onChange={handleInputs}
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={user.password}
                                    onChange={handleInputs}
                                    name="password"
                                    align="left"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid xs={12} sx={{ mt: 2 }}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={<div style={{ textAlign: "left" }}>I want to receive inspiration, marketing promotions and updates via email.</div>}
                        />
                    </Grid>
                    <Button onClick={submit} type="button" fullWidth variant="contained" sx={{ mt: 2, mb: 2, bgcolor: "secondary.main" }}>
                        Sign Up
                    </Button>
                    <Grid>
                        <Link onClick={()=>handleChange('event',0)} href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
            <Grid sx={{ mt: 5 }}>
                <Copyright />
            </Grid>
        </Grid>
    )
}
export default SignUp;