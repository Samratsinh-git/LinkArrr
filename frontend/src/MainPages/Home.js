// import { dividerClasses } from "@mui/material";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { TextField, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Box, Typography, Container, Link } from "@mui/material";
import axios from "axios";
import Appbar from "./AppBar";
import Copyright from "./Copyright";
import { HomeContext } from "../Context/context";



// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const useStyles = makeStyles((theme) => ({
    largeSearchBar: {
        width: '80%',
        maxWidth: '600px',
        margin: '90px auto 20px',
    },
}));

function Home() {
    const location = useLocation();
    const history = useNavigate();
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // const [user, setUser] = useState(location.state.user);
    const user = useContext(HomeContext);
    
  

    useEffect(() => {
        if(user.link == null){
            history('/');
        }

    },[user.link]);

    useEffect(() => {
        // Perform the API call when the searchQuery changes
        if (searchQuery) {
            axios.get(`http://localhost:5000/socials/${searchQuery}`)
                .then((response) => {
                    setSearchResult(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        // <HomeContext.Provider value={{user, setUser}}>
        <>
            <CssBaseline />
            <Appbar page="home" />
            <main>
                {/* Hero unit */}
                <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            LinkArray
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Below are the other open users of LinkArray, and the details given are their public details set by them.
                            Have a look around!!!
                        </Typography>

                        {/* Below will be my search bar: */}
                        <div className={classes.largeSearchBar}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="large"
                                label="Search"
                                placeholder="Search by username..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            {/* Display the search results */}
                            {searchResult.map((user) => (
                                <div key={user.link && user.link.name}>{user.link && user.link.username}</div>
                            ))}
                        </div>

                    </Container>
                </Box>
                {/* <Container sx={{ py: 8 }} maxWidth="md">
                    {// End hero unit ---}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                                    <CardMedia
                                        component="div"
                                        sx={{ pt: '56.25%' }} //16:9
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container> */}
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    End
                </Typography>
                <Typography
                    sx={{mt:1}}
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    That was a great journey surfing through other user's connections!!
                </Typography>
                <Grid sx={{ mt: 4 }}>
                    <Copyright />
                </Grid>
            </Box>
            {/* End footer */}
        {/* // </HomeContext.Provider> */}
        </>
    )
}

export default Home;