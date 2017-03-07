import React from 'react';
import {render} from 'react-dom';
import Category from './mobile/category.jsx';

function categories() {
  let categoriesArr = [],
    photoData = ps.o.photoData;

  for (var key in photoData) {
    if (photoData.hasOwnProperty(key)) {
      categoriesArr.push(
        <Category
          name={key}
          photos={photoData[key]} />
      );
    }
  }
  return (
    <div>
      {categoriesArr}
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div class="titleWrapper">
            <h1 id = "titleText">Your Photosite</h1>
            <aside id = "status"></aside>
          </div>
        </header>
        <div class="mobile-container--photos">
          {categories}
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('mobile-container'));
