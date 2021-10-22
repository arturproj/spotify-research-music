import React from "react";
import { connect } from "react-redux";
import {
  spotifyMapStateToProps,
  spotifyMapDispatchToProps,
} from "../redux/store";
import { get, callCategories } from "../helpers/spotify.api";
import { Grid, Menu, Segment, Button, Icon } from "semantic-ui-react";
import SearchForm from "../components/SearchForm";
import ListMapper from "../components/ListMapper";

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
    this.NavigationBar = this.NavigationBar.bind(this);
    this.PaginationBar = this.PaginationBar.bind(this);
  }

  toggleLoondings() {
    /**
     *
     */
    this.setState({ inLondings: !this.state.inLondings });
  }

  handleItemClick(e, { name }) {
    /**
     *
     */
    this.setState({ view: name });
  }

  async hendleFormSearch(query) {
    /**
     *
     */
    if (query !== this.state.query && query !== "" && query.length > 2)
      this.setState({ query: query });
    /**
     *
     */
    if (!this.state.inLondings) this.toggleLoondings();
    /**
     *
     */
    await callCategories(query).then((results) => {
      this.props.setArtists(results[0].artists);
      this.props.setAlbums(results[1].albums);
      this.props.setPlaylists(results[2].playlists);
    });
    /**
     *
     */
    if (this.state.inLondings) this.toggleLoondings();
  }

  callTogglePagination(url) {
    /**
     *
     */
    return get(url).then((result) => {
      /**
       *
       */
      if (result.hasOwnProperty("artists")) {
        this.props.setArtists(result.artists);
        //
      } else if (result.hasOwnProperty("albums")) {
        this.props.setAlbums(result.albums);
        //
      } else if (result.hasOwnProperty("playlists")) {
        this.props.setPlaylists(result.playlists);
        //
      } else {
        console.log("group undefined");
      }
    });
  }

  async dumpPage(key, state) {
    /**
     *
     */
    if (!this.state.inLondings) this.toggleLoondings();
    /**
     *
     */
    switch (key) {
      //
      case "previus":
        await this.callTogglePagination(state.prevPage);
        break;
      //
      case "next":
        await this.callTogglePagination(state.nextPage);
        break;
      default:
        console.log("action undefined");
        break;
    }
    /**
     *
     */
    if (this.state.inLondings) this.toggleLoondings();
  }

  NavigationBar() {
    return (
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
            <SearchForm
              value={this.state.query}
              hendleFormSearch={this.hendleFormSearch}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }

  PaginationBar() {
    return (
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
              onClick={() => this.dumpPage("next", this.props[this.state.view])}
              disabled={this.props[this.state.view].nextPage ? false : true}
            >
              Next
              <Icon name="right arrow" />
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }

  render() {
    return (
      <React.Fragment>
        <this.NavigationBar />
        <this.PaginationBar />
        <Segment>
          <Grid>
            <Grid.Row columns={5}>
              <ListMapper
                view={this.state.view}
                collection={this.props[this.state.view].collection}
              />
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
