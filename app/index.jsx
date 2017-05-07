import React from 'react';
import {render} from 'react-dom';
import WelcomePage from './welcome-page.jsx';
import FullApp from './full.jsx';
import MobileApp from './mobile.jsx';

// TODO: All of this HTML and the corresponding jQuery events need to be
// converted to React components
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photoData: {},
      categoryData: {}
    };
  }

  componentDidMount () {
    ps.fn.api.get('php/getdata.php').done(data => {
      ps.fn.assignConfigDataToPage(data.configdata);
      ps.o.categoryData = data.photodata;
      for (let category in data.photodata) {
        if (data.photodata[category]['photos'][0]['id'] != null) {
          ps.o.photoData[category] = data.photodata[category]['photos'];
        } else {
          ps.o.photoData[category] = [];
        }

        for (let prop in data.photodata[category]) {
          if (data.photodata[category][prop] == "") {
            ps.o.categoryData[category][prop] = ps.o.siteDefaults[prop] || "";
          }
        }
        if (ps.v.panesHiddenByURL.indexOf(category) == -1 &&
          data.photodata[category].hidden == '0' ||
          ps.v.panesAddedByURL.indexOf(category) > -1) {
          ps.v.categoriesShown.push(category);
        }
        ps.o.categoryData[category].isFirstLoad = true;
        ps.o.categoryData[category].pagePosition = 0;
        ps.o.categoryData[category].resetPane = false;
        delete ps.o.categoryData[category].photos;
      }

      for (let x in ps.o.photoData) {
        for (let y in ps.o.photoData[x]) {
          ps.o.picsCaptions[ps.o.photoData[x][y].filename] = ps.o.photoData[x][y].caption;
          ps.o.picsComments[ps.o.photoData[x][y].filename] = ps.o.photoData[x][y].comments;
        }
      }
      this.setState({
        photoData: ps.o.photoData,
        categoryData: ps.o.categoryData
      });
      // Trigger 'hashchange' event handler in legacy app to complete init process
      $('body').trigger('click');
      $(window).trigger('hashchange');
    });
  }

  render() {
    return ps.fn.inUrl('welcome') ? welcomePage : (
      <div>
        <FullApp
          photoData={this.state.photoData}
          categoryData={this.state.categoryData}/>
        <MobileApp
          photoData={this.state.photoData}
          categoryData={this.state.categoryData}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('react-container'));
