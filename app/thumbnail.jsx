import React from 'react';
import {render} from 'react-dom';

class Thumbnail extends React.Component {
  render() {
    return (
      <div className="minipane minipane-mobile loaded"
        data-path={this.props.filename}
        style={{backgroundImage: `url('photothumbs/${this.props.filename}')`}}>
      </div>
    );
  }
}

module.exports = Thumbnail;
