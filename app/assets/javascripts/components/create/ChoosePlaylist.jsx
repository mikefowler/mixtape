import React from 'react';
import Router from 'react-router';
import PlaylistByUserStore from '../../stores/PlaylistsByUserStore';
import PlaylistActions from '../../actions/PlaylistActions';
import PlaylistThumbnail from '../../components/PlaylistThumbnail';
import RadioGroup from '../../components/RadioGroup';
import connectToStores from '../../utils/connectToStores';

const { PropTypes } = React;
let { Navigation } = Router;

function parseUsername(params) {
  let { session } = params;
  return session.currentUser && session.currentUser.id;
}

let ChoosePlaylist = React.createClass({

  mixins: [Navigation],

  propTypes: {
    session: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
      currentUser: PropTypes.object.isRequired
    })
  },

  componentWillMount() {
    if (!this.props.session.isLoggedIn) {
      this.transitionTo('app');
      return;
    }
  },

  componentDidMount() {
    let username = parseUsername(this.props);
    PlaylistActions.requestPlaylistPage(username, true);
  },

  render() {
    const { playlists, session } = this.props;
    const { currentUser } = session;
    const uid = currentUser.id;
    const pagination = this.renderPagination();
    const isFetching = PlaylistByUserStore.isExpectingPage(uid);

    return (
      <div>
        <h2>Start with a playlist…</h2>

        {isFetching &&
          <p><i className="glyphicon glyphicon-refresh"></i></p>
        }

        <form>
          {playlists.map((playlist, index) => {
            if (!playlist.tracks.total) return;
            return (
              <RadioGroup name="playlist"
                          ref="playlistGroup"
                          key={playlist.id} className="radio">
                <label>
                  <input type="radio" value={playlist.id} />
                  <PlaylistThumbnail playlist={playlist} />
                </label>
              </RadioGroup>
            );
          })}

          {pagination}

          <button className="btn" onClick={this.saveAndContinue}>Next</button>
        </form>
      </div>
    );
  },

  renderPagination() {
    const { session, playlists } = this.props;
    const { currentUser } = session;
    const uid = currentUser.id;
    const isEmpty = playlists.length === 0;
    const isFetching = PlaylistByUserStore.isExpectingPage(uid);
    const isLastPage = PlaylistByUserStore.isLastPage(uid);

    return (
      <nav>
        <ul className="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  },

  saveAndContinue(e) {
    e.preventDefault();

    console.log(this.refs.playlistGroup.getCheckedValue());
    let data = {
      playlist: this.refs.playlistGroup.getCheckedValue()
    };

    this.props.saveValues(data);
    this.props.nextStep();
  },

  handleLoadMoreClick() {
    const username = parseUsername(this.props);
    PlaylistActions.requestPlaylistPage(username);
  }

});

function pickProps(params) {
  return params;
}

function getState(params) {
  const username = parseUsername(params);
  const playlists = PlaylistByUserStore.getPlaylists(username);

  return { playlists };
}

export default connectToStores(ChoosePlaylist,
  [PlaylistByUserStore],
  pickProps,
  getState
);
