import React from "react";
import { connect } from "react-redux";
import {
  spotifyMapStateToProps,
  spotifyMapDispatchToProps,
} from "../redux/store";
import { get, callCategories } from "../helpers/spotify.api";
import queryString from "query-string";
import { Grid, Input, Menu, Segment, Button, Icon } from "semantic-ui-react";
import Header from "../components/HeaderNotify";
import CardGrid from "../components/CardGrid";

class SpotifyDashboard extends React.Component {
  constructor(state) {
    super(state);

    this.state = {
      inLondings: true,
      query: "",
      view: "artists",
    };

    this.hendleFormSearch = this.hendleFormSearch.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
    // console.log(queryString.parse(this.props.location.search));
    this.setState({ inLondings: false });
  }

  componentDidUpdate() {
    // console.log(this.props, this.state);
    if (this.state.query !== "" && this.state.query.length > 2) {
    }
  }

  hendleFormSearch(value) {
    this.setState({ inLondings: true });
    callCategories(this.state.query).then((results) => {
      // console.log(results);
      if (results.length) {
        this.props.setArtists(results[0].artists);
        this.props.setAlbums(results[1].albums);
        this.props.setPlaylists(results[2].playlists);
      }
    });
    this.setState({ inLondings: false, query: value });
  }

  dumpPage(key, state) {
    // console.log(key, state);
    this.setState({ inLondings: true });

    switch (key) {
      case "previus":
        get(state.prevPage).then((result) => {
          // console.log("prevPage", result);
          if (result.artists) {
            this.props.setArtists(result.artists);
            this.setState({ inLondings: false });
          }
          if (result.albums) {
            this.props.setAlbums(result.albums);
            this.setState({ inLondings: false });
          }
          if (result.playlists) {
            this.props.setPlaylists(result.playlists);
            this.setState({ inLondings: false });
          }
        });

        return state;
      case "next":
        get(state.nextPage).then((result) => {
          // console.log("nextPage", result);
          if (result.artists) {
            this.props.setArtists(result.artists);
            this.setState({ inLondings: false });
          }
          if (result.albums) {
            this.props.setAlbums(result.albums);
            this.setState({ inLondings: false });
          }
          if (result.playlists) {
            this.props.setPlaylists(result.playlists);
            this.setState({ inLondings: false });
          }
        });
        break;
    }

    // console.log(this.props);
    // console.log("vvvo");
  }

  handleItemClick(e, { name }) {
    this.setState({ view: name });
  }

  render() {
    // console.log();
    return (
      <React.Fragment>
        <Menu pointing>
          <Menu.Menu>
            <Menu.Item
              name="artists"
              active={this.state.view === "artists"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="albums"
              active={this.state.view === "albums"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="playlists"
              active={this.state.view === "playlists"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                icon="search"
                value={this.state.query}
                placeholder="Search Song, Artist, Album ..."
                onChange={(e) => this.hendleFormSearch(e.target.value)}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu pointing>
          <Menu.Menu>
            <Menu.Item>
              <Button
                icon
                labelPosition="left"
                onClick={() =>
                  this.dumpPage("previus", this.props[this.state.view])
                }
                disabled={this.props[this.state.view].prevPage ? false : true}
              >
                <Icon name="left arrow" />
                Previous
              </Button>
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu>
            <Menu.Item>{this.props[this.state.view].total} results</Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                icon
                labelPosition="right"
                onClick={() =>
                  this.dumpPage("next", this.props[this.state.view])
                }
                disabled={this.props[this.state.view].nextPage ? false : true}
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment>
          <Grid>
            <Grid.Row columns={5}>
              {this.state.view === "artists" ? (
                this.props.artists.collection.length ? (
                  this.props.artists.collection.map((artist, i) => (
                    <CardGrid images={artist.images} key={i} />
                  ))
                ) : (
                  <Header title={"artists"} />
                )
              ) : null}

              {this.state.view === "albums" ? (
                this.props.albums.collection.length ? (
                  this.props.albums.collection.map((album, i) => (
                    <CardGrid images={album.images} key={i} />
                  ))
                ) : (
                  <Header title={"albums"} />
                )
              ) : null}

              {this.state.view === "playlists" ? (
                this.props.playlists.collection.length ? (
                  this.props.playlists.collection.map((playlist, i) => (
                    <CardGrid images={playlist.images} key={i} />
                  ))
                ) : (
                  <Header title={"playlists"} />
                )
              ) : null}
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default connect(
  spotifyMapStateToProps,
  spotifyMapDispatchToProps
)(SpotifyDashboard);
