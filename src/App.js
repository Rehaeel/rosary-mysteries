import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { slide as Menu } from 'react-burger-menu';
import MysteriesView from './component/mysteries-view/mysteries-view';
import axios from 'axios';
import Alert from './component/alert/alert';
import ContactPage from './component/contact-page/contact-page';
import { Route, NavLink } from 'react-router-dom';
import Zrzutka from './component/zrzutka/zrzutka';
import HowManyWeekdays from './component/mysteries-view/how-many-weekdays';
import Statics, { MORNING_HOUR_TRESHOLD } from './component/statics.js';
import ReactGA from 'react-ga';
import {
  Backdrop,
  MysteryFragment,
} from './component/mystery-fragment/mystery-fragment';
import Jezus from './component/photos/Jezus.png';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mysteryList: [],
      part: '/radosne',
      startingDay: '2021-10-01',
      alertVisibility: false,
      menuVisibility: false,
      fragmentVisibility: false,
      todayMystery: {
        nr: '1',
        mystery: 'tajemnica',
      },
      displayJezus: false,
    };
    this.mysteryList = Object(Statics.mysteryList);
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.showFragment = this.showFragment.bind(this);
    this.hideFragment = this.hideFragment.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.startAgain = this.startAgain.bind(this);
    this.returnMysteryNr = this.returnMysteryNr.bind(this);
    this.returnMystery = this.returnMystery.bind(this);
    this.partChoose = this.partChoose.bind(this);
    this.pullMysteries = this.pullMysteries.bind(this);
    this.isMorning = this.getToday.bind(this);
  }

  showAlert(_) {
    this.setState(state => ({ menuVisibility: !state.menuVisibility }));
    this.setState({ alertVisibility: true });
  }

  hideAlert() {
    this.setState({ alertVisibility: false });
  }

  showFragment() {
    this.setState({ fragmentVisibility: true, displayJezus: true });
  }

  hideFragment() {
    this.setState({ fragmentVisibility: false, displayJezus: false });
  }

  showMenu(_) {
    this.setState(state => ({ menuVisibility: !state.menuVisibility }));
  }

  handleStateChange(state) {
    this.setState({ menuVisibility: state.isOpen });
  }

  getToday() {
    let today = new Date().getDay();
    const yetMorning = new Date().getHours() < MORNING_HOUR_TRESHOLD;

    if (yetMorning) {
      if (today === 0) today = 6;
      else today -= 1;
    }

    return today;
  }

  async startAgain() {
    let date = new Date();
    let dateYear = date.getFullYear();
    let dateMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    let dateDay = ('0' + date.getDate()).slice(-2);

    let today = dateYear + '-' + dateMonth + '-' + dateDay;
    await axios.put(process.env.REACT_APP_DB_URL + `/startingday/${today}`);
    this.setState({
      menuVisibility: false,
      alertVisibility: false,
    });
    this.returnMystery();
  }

  async fetchStartingDay() {
    let response = await axios.get(
      process.env.REACT_APP_DB_URL + `/startingday`
    );
    this.setState({
      startingDay: response.data[0].startingDay.slice(0, 10),
    });
  }

  returnMysteryNr() {
    let startingDay = this.state.startingDay;
    const today = this.getToday();
    let countMysteries;
    if (today === 1 || today === 6) {
      countMysteries =
        HowManyWeekdays(1, startingDay) + HowManyWeekdays(6, startingDay);
      if (countMysteries > 5) {
        if (countMysteries % 5 === 0) return 5;
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    } else if (today === 2 || today === 5) {
      countMysteries =
        HowManyWeekdays(2, startingDay) + HowManyWeekdays(5, startingDay);
      if (countMysteries > 5) {
        if (countMysteries % 5 === 0) return 5;
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    } else if (today === 3 || today === 0) {
      countMysteries =
        HowManyWeekdays(3, startingDay) + HowManyWeekdays(0, startingDay);
      if (countMysteries > 5) {
        if (countMysteries % 5 === 0) return 5;
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    } else if (today === 4) {
      countMysteries = HowManyWeekdays(4, startingDay);
      if (countMysteries > 5) {
        if (countMysteries % 5 === 0) return 5;
        countMysteries = countMysteries % 5;
        return countMysteries;
      } else {
        return countMysteries;
      }
    }
  }

  returnMystery() {
    this.setState({
      todayMystery: this.state.mysteryList[this.returnMysteryNr() - 1],
    });
  }

  partChoose() {
    let today = this.getToday();

    if (today === 1 || today === 6) {
      this.setState({
        part: '/radosne',
      });
    } else if (today === 2 || today === 5) {
      this.setState({
        part: '/bolesne',
      });
    } else if (today === 3 || today === 0) {
      this.setState({
        part: '/chwalebne',
      });
    } else if (today === 4) {
      this.setState({
        part: '/światła',
      });
    }
  }

  pullMysteries() {
    if (this.state.part === '/radosne') {
      this.setState({
        mysteryList: this.mysteryList.slice(0, 5),
      });
    } else if (this.state.part === '/chwalebne') {
      this.setState({
        mysteryList: this.mysteryList.slice(5, 10),
      });
    } else if (this.state.part === '/światła') {
      this.setState({
        mysteryList: this.mysteryList.slice(10, 15),
      });
    } else if (this.state.part === '/bolesne') {
      this.setState({
        mysteryList: this.mysteryList.slice(15, 20),
      });
    }
  }

  componentDidMount = async () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    await this.partChoose();
    this.pullMysteries();
    this.returnMystery();
    console.log(this.state.todayMystery);
  };

  render() {
    return (
      <>
        {this.state.alertVisibility
          ? ReactDOM.createPortal(
              <Alert
                alertOverlayDisplay={
                  this.state.alertVisibility ? 'flex' : 'none'
                }
                okClicked={this.startAgain}
                cancelClicked={this.hideAlert}
              />,
              document.getElementById('error')
            )
          : undefined}

        {this.state.fragmentVisibility ? (
          <>
            {ReactDOM.createPortal(
              <Backdrop onClickHanddler={this.hideFragment} />,
              document.getElementById('backdrop')
            )}

            {ReactDOM.createPortal(
              <MysteryFragment onClickHanddler={this.hideFragment}>
                {this.state.todayMystery.fragment}
              </MysteryFragment>,
              document.getElementById('fragment')
            )}
          </>
        ) : undefined}

        <Menu
          customBurgerIcon={false}
          customCrossIcon={false}
          isOpen={this.state.menuVisibility}
          onStateChange={state => this.handleStateChange(state)}
        >
          <NavLink
            className="menu-tajemnice"
            to="/"
            onClick={state => this.showMenu(state)}
          >
            <h4>Dzisiejsza tajemnica</h4>
          </NavLink>
          {/* <NavLink to="">
            <h4 onClick={state => this.showAlert(state)}>Zacznij od nowa</h4>
          </NavLink> */}
          <NavLink to="/kontakt" onClick={state => this.showMenu(state)}>
            <h4>Masz pomysł? Napisz!</h4>
          </NavLink>

          <NavLink to="/zrzutka" onClick={state => this.showMenu(state)}>
            <h4>Wesprzyj dzieło</h4>
          </NavLink>
        </Menu>

        <div className="background_img"></div>
        {this.state.displayJezus ? (
          <img className="jezus" src={Jezus} alt="Jezus" />
        ) : (
          ''
        )}
        <div className="App">
          {/* <div className="content-shadow"> */}
          <Route exact path="/">
            <MysteriesView
              showMenu={state => this.showMenu(state)}
              startingDay={this.state.startingDay}
              part={this.state.part}
              todayMystery={this.state.todayMystery}
              onFragmentClickHandler={this.showFragment}
            />
          </Route>
          <Route path="/kontakt">
            <ContactPage showMenu={state => this.showMenu(state)} />
          </Route>
          <Route path="/zrzutka">
            <Zrzutka showMenu={state => this.showMenu(state)} />
          </Route>
        </div>
        {/* </div> */}
      </>
    );
  }
}
