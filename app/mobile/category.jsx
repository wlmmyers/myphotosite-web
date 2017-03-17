import React from 'react';
import {render} from 'react-dom';
import Thumbnail from '../thumbnail.jsx';

class Category extends React.Component {
  thumbnails() {
    let output = [];

    return this.props.photos.map(photo => {
      return (
        <Thumbnail
          key={photo.id}
          id={photo.id}
          filename={photo.filename}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div className="mobile-container--thumbnailContainer">
          {this.thumbnails()}
        </div>
      </div>
    );
  }
};

module.exports = Category;
