import React from 'react';
import './App.css';
import { slide as Menu } from 'react-burger-menu';
import MysteriesView from './component/mysteries-view/mysteries-view';
import axios from 'axios';
import Alert from './component/alert/alert';
import ContactPage from './component/contact-page/contact-page';
import { Route, NavLink } from "react-router-dom";
import Zrzutka from './component/zrzutka/zrzutka';
import HowManyWeekdays from './component/mysteries-view/how-many-weekdays';
import Statics from './component/statics.js'


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mysteryList: [],
      part: "/radosne",
      startingDay: "2021-09-08",
      alertVisibility: false,
      menuVisibility: false,
      todayMystery: {
        nr: "1",
        mystery: "tajemnica"
      }
    }
    this.mysteryList = Object(Statics.mysteryList);

    this.updateVH = this.updateVH.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.startAgain = this.startAgain.bind(this);
    this.fetchStartingDay = this.fetchStartingDay.bind(this);
    this.returnMysteryNr = this.returnMysteryNr.bind(this);
    this.returnMystery = this.returnMystery.bind(this);
    this.partChoose = this.partChoose.bind(this);
    this.pullMysteries = this.pullMysteries.bind(this);
  }

  updateVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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

  async startAgain() {
    let date = new Date();
    let dateYear = date.getFullYear();
    let dateMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    let dateDay = ("0" + date.getDate()).slice(-2);

    let today = dateYear + "-" + dateMonth + "-" + dateDay;
    await axios.put(process.env.REACT_APP_DB_URL + `/startingday/${today}`);
    this.setState({
      menuVisibility: false,
      alertVisibility: false
    });
    await this.fetchStartingDay();
    await this.returnMystery();
  }

  async fetchStartingDay() {
    let response = await axios.get(process.env.REACT_APP_DB_URL + `/startingday`);
    this.setState({
      startingDay: response.data[0].startingDay.slice(0, 10)
    })
  }

  returnMysteryNr() {
    let startingDay = this.state.startingDay;
    const today = new Date().getDay();
    let countMysteries;
    if (today === 1 || today === 6) {
      countMysteries = HowManyWeekdays(1, startingDay) + HowManyWeekdays(6, startingDay) - 1;
      if (countMysteries > 5) {
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    } else if (today === 2 || today === 5) {
      countMysteries = HowManyWeekdays(2, startingDay) + HowManyWeekdays(5, startingDay) - 1;
      if (countMysteries > 5) {
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    } else if (today === 3 || today === 0) {
      countMysteries = HowManyWeekdays(3, startingDay) + HowManyWeekdays(0, startingDay) - 1;
      if (countMysteries > 5) {
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    } else if (today === 4) {
      countMysteries = HowManyWeekdays(4, startingDay) - 1;
      if (countMysteries > 5) {
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    }
  }

  async returnMystery() {
    await this.setState({
      todayMystery: this.state.mysteryList[this.returnMysteryNr()]
    });
  }

  async partChoose() {
    let today = new Date().getDay();
    if (today === 1 || today === 6) {
      await this.setState({
        part: '/radosne'
      })
    } else if (today === 2 || today === 5) {
      await this.setState({
        part: '/bolesne'
      })
    } else if (today === 3 || today === 0) {
      await this.setState({
        part: '/chwalebne'
      })
    } else if (today === 4) {
      await this.setState({
        part: '/swiatla'
      })
    }
  };

  async pullMysteries() {
    if (this.state.part === '/radosne') {
      await this.setState({
        mysteryList: this.mysteryList.slice(0, 5)
      });
    } else if (this.state.part === '/chwalebne') {
      await this.setState({
        mysteryList: this.mysteryList.slice(5, 10)
      });
    } else if (this.state.part === '/swiatla') {
      await this.setState({
        mysteryList: this.mysteryList.slice(10, 15)
      });
    } else if (this.state.part === '/bolesne') {
      await this.setState({
        mysteryList: this.mysteryList.slice(15, 20)
      });
    }
  };

  componentDidMount = async () => {
    this.updateVH();
    await this.partChoose();
    await this.pullMysteries();
    await this.returnMystery();
    await this.fetchStartingDay();
    await this.returnMystery();
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
          <NavLink className="menu-tajemnice" to="/" onClick={(state) => this.showMenu(state)}>
            <h4>
              Dzisiejsza tajemnica
            </h4>
          </NavLink>
          <h4 onClick={(state) => this.showAlert(state)}>
            Zacznij od nowa
          </h4>

          <NavLink to="/contact" onClick={(state) => this.showMenu(state)}>
            <h4>
              Masz pomysł? Napisz!
            </h4>
          </NavLink>

          <NavLink to="/zrzutka" onClick={(state) => this.showMenu(state)}>
            <h4>
              Wesprzyj dzieło
            </h4>
          </NavLink>
        </Menu>

        <div className="App">
          <Route exact path="/">
            <MysteriesView
              showMenu={(state) => this.showMenu(state)}
              startingDay={this.state.startingDay}
              part={this.state.part}
              todayMystery={this.state.todayMystery}
            />
          </Route>
          <Route path="/contact">
            <ContactPage showMenu={(state) => this.showMenu(state)} />
          </Route>
          <Route path="/zrzutka">
            <Zrzutka showMenu={(state) => this.showMenu(state)} />
          </Route>
        </div>
      </>
    )
  }

}