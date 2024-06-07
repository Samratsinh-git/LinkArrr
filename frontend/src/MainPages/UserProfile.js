import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Box,
  Button,
} from "@mui/material";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import HideAppBar from "./AppBar2";
import { HomeContext } from "../Context/context";
import LogoCarousel from "../components/LogoCarousel";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(3),
  },
}));

const UserPage = () => {
  const [userData, setuserData] = useState();
  const [isuserData, isSetuserData] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  // const location = useLocation();
  // const user = location.state.user;
  const user = useContext(HomeContext);
  const token = localStorage.getItem("token");
  console.log(token);
  const history = useNavigate();
  // const [conn,setConn] = useState();

  useEffect(() => {
    if (user.link == null) {
      history("/");
    }
  }, [user.link]);

  const callUserPage = async () => {
    // isSetuserData(false);
    axios
      .get(`http://localhost:5000/socials/${user.link.connections[0]}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setuserData(data);
        isSetuserData(true);

        // setTimeout(() => {
        // }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    callUserPage();
  }, [user]);

  return (
    <React.Fragment>
      <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Logo Carousel</h1>
      <LogoCarousel />
    </div>
      {/* <Paper className={classes.root}>
        <HideAppBar />
        {isuserData && (
          <>
            <Box sx={{mt:40,padding:4}}>
            <Button variant="outlined" size="large" href={userData.linkedin}>
              LinkedIn
            </Button>
            <Button variant="outlined" size="large" href={userData.facebook}>
              Facebook
            </Button>
            <Button variant="outlined" size="large" href={userData.twitter}>
              Twitter
            </Button>
            <Button variant="outlined" size="large" href={userData.instagram}>
              Instagram
            </Button>
            <Button variant="outlined" size="large" href={userData.teams}>
              MicrosoftTeams
            </Button>
            <Button variant="outlined" size="large" href={userData.telegram}>
              Telegram
            </Button>
            </Box>
          </>
        )}
      </Paper> */}
    </React.Fragment>
  );
};
{
  /*  */
}

export default UserPage;
