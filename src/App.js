import './App.css';
import { slide as Menu } from 'react-burger-menu';
import MysteriesView from './component/mysteries-view/mysteries-view';
import React from 'react';
import axios from 'axios';
import Alert from './component/alert/alert';
import ContactPage from './component/contact-page/contact-page';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      alertVisibility: false,
      menuVisibility: false
    }

    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.startAgain = this.startAgain.bind(this);
  }

  showAlert(state) {
    this.setState(state => ({ menuVisibility: !state.menuVisibility }))
    this.setState({ alertVisibility: true })
  }

  hideAlert() {
    this.setState({ alertVisibility: false })
  }

  showMenu(state) {
    this.setState(state => ({ menuVisibility: !state.menuVisibility }))
  }

  handleStateChange(state) {
    this.setState({ menuVisibility: state.isOpen })
  }


  startAgain() {
    let date = new Date();
    let dateYear = date.getFullYear();
    let dateMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    let dateDay = ("0" + date.getDate()).slice(-2);

    let today = dateYear + "-" + dateMonth + "-" + dateDay;
    axios.put(process.env.REACT_APP_DB_URL + `/startingday/${today}`);
    this.setState({
      menuVisibility: false,
      alertVisibility: false
    });
  }

  render() {
    return (
      <>
        <Alert
          alertOverlayDisplay={this.state.alertVisibility ? "flex" : "none"}
          okClicked={this.startAgain}
          cancelClicked={this.hideAlert}
        />

        <Menu
          customBurgerIcon={false}
          customCrossIcon={false}
          isOpen={this.state.menuVisibility}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <h4 className="menu-tajemnice"><a href="/">Tajemnice</a></h4>
          <h4 className="menu-restart" onClick={(state) => this.showAlert(state)}>Zacznij od nowa</h4>
          <h4><a href="/contact">Masz pomysł? Napisz!</a></h4>
          <h4>Wesprzyj twórcę</h4>
        </Menu>

        <div className="App">
          <Router>
            <Route exact path="/">
              <MysteriesView showMenu={(state) => this.showMenu(state)} />
            </Route>
            <Route path="/contact">
              <ContactPage showMenu={(state) => this.showMenu(state)} />
            </Route>
          </Router>
        </div>
      </>
    )
  }

}