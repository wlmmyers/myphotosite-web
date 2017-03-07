import React from 'react';
import {render} from 'react-dom';

class Thumbnail extends React.Component {
  render() {
    return (
      <div class="minipane loaded"
        data-path={this.props.filename}
        style="background-image: url('photothumbs/{this.props.filename}')">
      </div>
    );
  }
}

module.exports = Thumbnail;
