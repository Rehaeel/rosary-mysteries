import React from 'react'
import './mysteries-view.css';
// import Rose from '../icons/rose.svg'
import icons from '../icons/icons';

export default class MysteriesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todayMeditation: "...",
            meditationVisibility: false
        };
    }

    async shuffleMeditation() {
        let number = Math.ceil(Math.random() * 3);
        let meditation;
        if (number === 1) {
            meditation = this.props.todayMystery.meditation1;
        } else if (number === 2) {
            meditation = this.props.todayMystery.meditation2;
        } else if (number === 3) {
            meditation = this.props.todayMystery.meditation3;
        }
        await this.setState({
            todayMeditation: meditation
        });
    };

    toggleMeditationVisibility() {
        this.shuffleMeditation();
        this.setState({
            meditationVisibility: !this.state.meditationVisibility
        });
    }

    meditationProps(ifTrue, ifFalse) {
        return this.state.meditationVisibility ? ifTrue : ifFalse
    }

    componentDidMount = async () => {
        await this.shuffleMeditation();
    }

    render() {
        return (
            <div
                className={`mysteries-view ${this.state.meditationVisibility ? 'mysteries-view-mobile' : ''}`} >
                <p> rozpoczęto dnia: {this.props.startingDay} </p>
                <icons.Rose
                    className="menu-icon"
                    onClick={this.props.showMenu}
                    alt='reset starting day' />
                <h1> Dzisiejsza tajemnica: </h1>
                <h3> tajemnice {this.props.part.slice(1)}: </h3>
                <h2> {this.props.todayMystery.nr + '. ' + this.props.todayMystery.mystery} </h2>
                <div
                    className="szczalka"
                    onClick={() => this.toggleMeditationVisibility()}
                    style={{ transform: this.meditationProps('rotate(180deg) scale(0.7)', 'rotate(0deg)  scale(0.7)') }} >
                    V
                </div>

                <h3 style={{ display: this.meditationProps("block", "none") }} >Dzisiejsze rozważanie:</h3>
                <p style={{ display: this.meditationProps("block", "none") }} > {this.state.todayMeditation} </p>


                {/* {this.state.mysteryList.map(res =>
                <h3 key={res.id} className="mystery"> {res.nr + '. ' + res.mystery}</h3>)} */
                }
            </div >
        )
    }
}
