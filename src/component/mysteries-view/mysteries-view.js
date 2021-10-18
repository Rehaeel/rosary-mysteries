import React from 'react';
import './mysteries-view.css';
// import Rose from '../icons/rose.svg'
import icons from '../icons/icons';
import ReactGA from 'react-ga';

export default class MysteriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayMeditation: '...',
      meditationVisibility: false,
      componentVisibility: 'hidden',
    };
  }

  shuffleMeditation() {
    let number = Math.ceil(Math.random() * 3);
    let meditation;
    if (number === 1) {
      meditation = this.props.todayMystery.meditation1;
    } else if (number === 2) {
      meditation = this.props.todayMystery.meditation2;
    } else if (number === 3) {
      meditation = this.props.todayMystery.meditation3;
    }
    this.setState({
      todayMeditation: meditation,
    });
  }

  toggleMeditationVisibility() {
    this.setState({
      meditationVisibility: !this.state.meditationVisibility,
    });
    this.shuffleMeditation();
  }

  meditationProps(ifTrue, ifFalse) {
    return this.state.meditationVisibility ? ifTrue : ifFalse;
  }

  componentDidMount = async () => {
    this.shuffleMeditation();
    setTimeout(() => this.setState({ componentVisibility: 'visible' }), 200);
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  render() {
    return (
      <div
        className={`mysteries-view ${
          this.state.meditationVisibility ? 'mysteries-view-mobile' : ''
        } ${this.state.componentVisibility}`}
      >
        <p> rozpoczęto dnia: {this.props.startingDay} </p>
        <icons.Rose
          className="menu-icon"
          onClick={this.props.showMenu}
          alt="reset starting day"
        />
        <h1> Dzisiejsza tajemnica: </h1>
        <h3> tajemnice {this.props.part.slice(1)}: </h3>
        <div
          onClick={this.props.onFragmentClickHandler}
          className="todays-mistery button-colored"
        >
          <h2>
            {`${this.props.todayMystery.nr}. ${this.props.todayMystery.mystery}`}
          </h2>
          <ArrowAnimation>⇩</ArrowAnimation>
        </div>
        <div
          className="szczalka button-colored"
          onClick={() => this.toggleMeditationVisibility()}
          style={{
            transform: this.meditationProps(
              'rotate(180deg) scale(0.7)',
              'rotate(0deg)  scale(0.7)'
            ),
          }}
        >
          V
        </div>
        <div
          style={{
            maxHeight: this.meditationProps(1000, 0),
            transition: 'all .5s ease',
          }}
          className="meditation"
        >
          <h3>Dzisiejsze rozważanie:</h3>
          <p> {this.state.todayMeditation} </p>
        </div>

        {/* {this.state.mysteryList.map(res =>
                <h3 key={res.id} className="mystery"> {res.nr + '. ' + res.mystery}</h3>)} */}
      </div>
    );
  }
}

const ArrowAnimation = props => {
  return <div className="arrow-animation">{props.children}</div>;
};
