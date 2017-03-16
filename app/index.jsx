import React from 'react';
import {render} from 'react-dom';
import Category from './mobile/category.jsx';
import WelcomePage from './welcome-page.jsx';

const aboutIntroText = `Hi! I am Will Myers, the creator of MyPhotosite.
    I enjoy long walks in the woods, good photography, and great web design and development.`,
  contactIntroText = `This page provides your visitors with a quick way to comment
    on your work or reach you discretely.`,
  requestIntroText = `If your visitors would like a high-res copy of a photo, they
    can request one here, by either entering the photo's category and number in the
    box below or just clicking the <strong>R</strong> button at the top right while
    viewing the photo (if present).`;

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

class MobileApp extends React.Component {
  render () {
    return categories();
  }
}

// TODO: All of this HTML and the corresponding jQuery events need to be
// converted to React components
class App extends React.Component {

  render() {
    let welcomePage = <WelcomePage/>;
    let mainSite = (
      <div>
        <header>
          <div className="titleWrapper">
            <h1 id="titleText">Your Photosite</h1>
            <aside id="status">Demo</aside>
          </div>
        </header>
        <div className="panecontainer">
          <div className="infopane">
            <h3>About</h3>
          </div>
          <div className="bigpane" id="aboutpane">
            <p>{aboutIntroText}</p>
            <div className="selfimage">
              <div className="selfimage-img"></div>
              <div className ="selfpromote">
                <a href= "https://www.facebook.com/theordinaryworld" target="_blank">
                  <img className ="icon" src ="images/icons/facebook_256.png" alt="fb"/>
                </a>
                <a href= "https://twitter.com/wlmmyers" target="_blank">
                  <img className ="icon" src ="images/icons/twitter_256.png" alt="twitter"/>
                </a>
                <a href= "https://www.linkedin.com/in/william-myers-0228ab35/" target="_blank">
                  <img className ="icon" src ="images/icons/linkedin_256.png" alt="linkedin"/>
                </a>
                <a href= "https://plus.google.com/105926105232850459792" target="_blank">
                  <img className ="icon" src ="images/icons/google-plus_256.png" alt="google plus"/>
                </a>
              </div>
            </div>
          </div>
          <div className="bigpane" id="creationspane">
            <p>Creations are coming!</p>
          </div>
          <div className="bigpane" id="contactpane">
            <p>{contactIntroText}</p>
            <form className="feedbackform">
              <div className="formrow">
              <label htmlFor="feedback_name">Your name (optional)</label><textarea id="feedback_name"></textarea>
              </div>
              <div className="formrow">
              <label htmlFor="feedback_comment">Comment</label><textarea id="feedback_comment"></textarea>
              </div>
              <div className="buttonrow">
              <input type="button" className="greenbutton" id="submitfeedback" value="Submit"/>
              <input type="button" className="greenbutton" id="clearfeedback" value="Clear"/>
              </div>
            </form>
          </div>
          <div className="bigpane" id="requestpane">
            <p>{requestIntroText}</p>
            <form className="requestform">
              <div className="formrow">
              <label htmlFor="request_requestedphoto">Photo Description</label><textarea id="request_requestedphoto"></textarea>
              </div>
              <div className="formrow">
              <label htmlFor="request_email">Your email</label><textarea id="request_email"></textarea>
              </div>
              <div className="formrow">
              <label htmlFor="request_comments">Additional Comments</label><textarea id="request_comments"></textarea>
              </div>
              <div className="buttonrow">
              <input type="button" className="orangebutton" id="submitrequest" value="Submit"/>
              <input type="button" className="orangebutton" id="clearrequest" value="Clear"/>
              </div>
            </form>
          </div>
        </div>
        <footer>
          <div className="menubar" id="mainmenu">
            <a href="#photos" className="menubaritem" id="photos" >Photos</a>
            <a href="#about" className="menubaritem" id="about">About</a>
            <a href="#contact" className="menubaritem" id="contact">Contact</a>
            <a href="#request" className="menubaritem" id="request">Request</a>
            <a href="#creations" className="menubaritem" id="creations" >Creations</a>
            <a href="#" className="menubaritem" id="codeitem">Code</a>
          </div>
          <div id= "ietagline"><aside>Designed and Maintained by You</aside></div>
        </footer>
        <img id="thumbImgHidden" src="" alt="hiddenImage"/>
      </div>
    );

    return ps.fn.inUrl('welcome') ? welcomePage : mainSite;
  }
}

render(<App/>, document.getElementById('main-container'));
render(<MobileApp/>, document.getElementById('mobile-container'));
