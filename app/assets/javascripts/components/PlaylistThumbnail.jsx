import React from 'react';
const { PropTypes } = React;

let PlaylistThumbnail = React.createClass({
  propTypes: {
    playlist: PropTypes.shape({
      images: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired
    })
  },

  render() {
    let playlist = this.props.playlist;
    let image = playlist.images.pop();

    return (
      <div className="media">
        <div className="media-left">
          {image && image.url &&
            <img className="thumbnail media-object"
                 src={image.url}
                 width="60"
                 height="60"
                 alt={"Album artwork for " + playlist.name} />}
        </div>
        <div className="media-body">
          <h4 className="media-heading">{playlist.name}</h4>
        </div>
      </div>
    );
  }
});

export default PlaylistThumbnail;
