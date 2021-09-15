import axios from 'axios';
import React from 'react'
import './mysteries-view.css';
import HowManyWeekdays from './how-many-weekdays.js';
import Rose from '../icons/rose.svg'
import Statics from '../statics.js'

export default class MysteriesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mysteryList: [],
            part: '/swiatla',
            todayMystery: {
                nr: "1",
                mystery: "tajemnica"
            },
            startingDay: '2021-09-08',
            todayMeditation: "...",
            meditationVisibility: false,
        };

        this.mysteryList = Object(Statics.mysteryList);
    }

    async partChoose() {
        let today = new Date().getDay();
        if (today === 1 || today === 6) {
            await this.setState({ part: '/radosne' })
        } else if (today === 2 || today === 5) {
            await this.setState({ part: '/bolesne' })
        } else if (today === 3 || today === 0) {
            await this.setState({ part: '/chwalebne' })
        } else if (today === 4) {
            await this.setState({ part: '/swiatla' })
        }
    };

    async pullMysteries() {
        if (this.state.part === '/radosne') {
            await this.setState({ mysteryList: this.mysteryList.slice(0, 5) });
        } else if (this.state.part === '/chwalebne') {
            await this.setState({ mysteryList: this.mysteryList.slice(5, 10) });
        } else if (this.state.part === '/swiatla') {
            await this.setState({ mysteryList: this.mysteryList.slice(10, 15) });
        } else if (this.state.part === '/bolesne') {
            await this.setState({ mysteryList: this.mysteryList.slice(15, 20) });
        }
    };

    async returnMysteryNr() {
        let today = new Date().getDay();
        let countMysteries;
        if (today === 1 || today === 6) {
            countMysteries = await HowManyWeekdays(1) + await HowManyWeekdays(6) - 1;
            if (countMysteries > 5) {
                countMysteries = countMysteries % 5;
                return countMysteries;
            } else {
                return countMysteries;
            }
        } else if (today === 2 || today === 5) {
            countMysteries = await HowManyWeekdays(2) + await HowManyWeekdays(5) - 1;
            if (countMysteries > 5) {
                countMysteries = countMysteries % 5;
                return countMysteries;
            } else {
                return countMysteries;
            }
        } else if (today === 3 || today === 0) {
            countMysteries = await HowManyWeekdays(3) + await HowManyWeekdays(0) - 1;
            if (countMysteries > 5) {
                countMysteries = countMysteries % 5;
                return countMysteries;
            } else {
                return countMysteries;
            }
        } else if (today === 4) {
            countMysteries = await HowManyWeekdays(4) - 1;
            if (countMysteries > 5) {
                countMysteries = countMysteries % 5;
                return countMysteries;
            } else {
                return countMysteries;
            }
        }
    }

    async fetchStartingDay() {
        let response = await axios.get(process.env.REACT_APP_DB_URL + `/startingday`);
        this.setState({ startingDay: response.data[0].startingDay.slice(0, 10) })
    }

    async shuffleMeditation() {
        let number = Math.ceil(Math.random() * 3);
        let meditation;
        if (number === 1) {
            meditation = this.state.todayMystery.meditation1;
        } else if (number === 2) {
            meditation = this.state.todayMystery.meditation2;
        } else if (number === 3) {
            meditation = this.state.todayMystery.meditation3;
        }
        await this.setState({ todayMeditation: meditation });
    };

    toggleMeditationVisibility() {
        this.setState({ meditationVisibility: !this.state.meditationVisibility });
    }

    componentDidMount = async () => {
        await this.partChoose();
        await this.pullMysteries();
        await this.fetchStartingDay();
        await this.setState({ todayMystery: this.state.mysteryList[await this.returnMysteryNr()] });
        await this.shuffleMeditation();
    }

    async componentDidUpdate() {
        await this.fetchStartingDay();
    }

    render() {
        return (
            <div className={`mysteries-view ${this.state.meditationVisibility ? 'mysteries-view-mobile' : ''}`}>
                <p>rozpoczęto dnia: {this.state.startingDay}</p>
                <img className="menu-icon" src={Rose} onClick={this.props.showMenu} alt='reset starting day' />

                <h1>Dzisiejsza tajemnica:</h1>
                <h3>tajemnice {this.state.part.slice(1)}:</h3>
                <h2>{this.state.todayMystery.nr + '. ' + this.state.todayMystery.mystery}</h2>

                <div className="szczalka"
                    onClick={() => this.toggleMeditationVisibility()}
                    style={{ transform: this.state.meditationVisibility ? 'rotate(180deg) scale(0.7)' : 'rotate(0deg)  scale(0.7)' }}>
                    V
                </div>

                <h3 style={{ display: this.state.meditationVisibility ? 'block' : 'none' }}>
                    Dzisiejsze rozważanie:
                </h3>

                <p style={{ display: this.state.meditationVisibility ? 'block' : 'none' }}>
                    {this.state.todayMeditation}
                </p>
                {/* {this.state.mysteryList.map(res =>
                        <h3 key={res.id} className="mystery"> {res.nr + '. ' + res.mystery}</h3>
                    )} */}
            </div >
        )
    }
}
