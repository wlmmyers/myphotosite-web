import React from 'react';
import {render} from 'react-dom';
import Thumbnail from '../thumbnail.jsx';

function thumbnails() {
  let output = [];

  return this.props.photos.map(photo => {
    return (
      <Thumbnail
        id={photo.id}
        filename={photo.filename}
      />
    );
  });
}

class Category extends React.Component {
  render() {
    return (
      <div>
        <header>{this.props.name}</header>
        <div class="mobile-container--thumbnailContainer">
          {thumbnails}
        </div>
      </div>
    );
  }
};

module.exports = Category;
