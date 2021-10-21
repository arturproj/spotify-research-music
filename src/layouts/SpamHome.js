import React from "react";
import { Container, Grid, Image, Button } from "semantic-ui-react";
import { SPOTIFY_AUTHORIZE_URL } from "../helpers/spotifyUrls";
import "../assets/home.css";

export default function SpotifyHome() {
  const handleLogin = () => (window.location = SPOTIFY_AUTHORIZE_URL);
  return (
    <Container className="home-container">
      <Grid centered padded>
        <Grid.Row className="home-container-grid-row">
          <Grid.Column className="home-container-grid-row-col">
            <Image
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
              alt="Spotify logo"
              className="logo-brand"
            />
            <Button compact onClick={handleLogin}>
              Login to Spotify
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
