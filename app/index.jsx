import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> This is mobile! </p>;
  }
}

render(<App/>, document.getElementById('mobile-container'));
