import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  AppBar,
} from "@mui/material";
import axios from "axios";
import Appbar from "./AppBar";
import { HomeContext } from "../Context/context";

const SocialMediaForm = () => {
  const history = useNavigate();
  const [username, setUsername] = useState();
  const [linkedin, setLinkedin] = useState("");
  const [fb, setFB] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [teams, setTeams] = useState("");
  const [telegram, setTelegram] = useState("");
  const location = useLocation();
  // const [user, setUser] = useState(location.state.user);

  const user = useContext(HomeContext);

  const [formData, setFormData] = useState({
    username: user.link && user.link.username,
  });

  let name, value;
  const handleChange = (e) => {
    // const { name, value } = e.target;
    name = e.target.name;
    value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user.link == null) {
      history("/");
    }
  }, [user.link]);

  const handleSubmit = (e) => {
    console.log(user);
    e.preventDefault();

    if (linkedin !== "") {
      setFormData({ ...formData, linkedin: linkedin });
    }
    if (fb !== "") {
      setFormData({ ...formData, facebook: fb });
    }
    if (instagram !== "") {
      setFormData({ ...formData, instagram: instagram });
    }
    if (twitter !== "") {
      setFormData({ ...formData, twitter: twitter });
    }
    if (teams !== "") {
      setFormData({ ...formData, teams: teams });
    }
    if (telegram !== "") {
      setFormData({ ...formData, telegram: telegram });
    }
    // setFormData({...formData,  username: user.username });

    console.log(formData);

    axios
      .post("http://localhost:5000/socials/add", formData)
      .then((response) => {
        console.log(response.data);
        history("/home", { state: { user: user.link } });
      })
      .catch((error) => {
        console.log(error);
        alert("Socials not inserted!" + error.message);
      });
  };

  return (
    // <HomeContext.Provider value={{ user, setUser }}>
    <>
      <Appbar page="addSocials" />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={3} style={{ padding: "20px", width: "300px" }}>
          <Typography variant="h5" gutterBottom>
            User Profile
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={user.link && user.link.username}
              // onChange={handleChange}
              margin="normal"
              // error={!!errors.username}
              // helperText={errors.username}
              disabled
            />
            <TextField
              fullWidth
              label="Facebook"
              name="facebook"
              variant="outlined"
              value={formData.facebook}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Twitter"
              name="twitter"
              variant="outlined"
              value={formData.twitter}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Instagram"
              name="instagram"
              variant="outlined"
              value={formData.instagram}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="LinkedIn"
              name="linkedin"
              variant="outlined"
              value={formData.linkedin}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="MicrosoftTeams"
              name="teams"
              variant="outlined"
              value={formData.teams}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Telegram"
              name="telegram"
              variant="outlined"
              value={formData.telegram}
              onChange={handleChange}
              margin="normal"
            />
            <Box mt={2}>
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
    // </HomeContext.Provider>
  );
};

export default SocialMediaForm;
