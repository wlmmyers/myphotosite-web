import React from 'react';
import {render} from 'react-dom';
import Category from './mobile/category.jsx';

class MobileApp extends React.Component {
  categories() {
    let categoriesArr = [],
      photoData = this.props.photoData;

    for (let key in photoData) {
      if (photoData.hasOwnProperty(key)) {
        categoriesArr.push(
          <Category
            key={key}
            name={key}
            photos={photoData[key]} />
        );
      }
    }
    return categoriesArr;
  }

  render () {
    return (
      <div id="mobile-container">
        {this.categories()}
      </div>
    );
  }
}

module.exports = MobileApp;
