import React from "react";
import { Container, Grid, Image, Button } from "semantic-ui-react";

import { SPOTIFY_AUTHORIZE_URL } from "../helpers/spotifyUrls";

export default function SpotifyHome() {
  const handleLogin = () => (window.location = SPOTIFY_AUTHORIZE_URL);
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Grid centered padded>
        <Grid.Row style={{ height: "100%" }}>
          <Grid.Column
            style={{ textAlign: "center"}}
          >
            <Image
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
              alt="Spotify logo"
              style={{
                height: "60px",
                weight: "auto",
                marginBottom: "12px",
              }}
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
