import axios from 'axios';
import React from 'react'
import './mysteries-view.css';

const endpoint = process.env.REACT_APP_DB_URL;

// let startDay = Math.floor(Date.now() / 86400000);
// let daySpent = Math.floor(Date.now() / 86400000) % startDay;

export default class MysteriesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mysteries: [],
            part: '/swiatla',
            radosneCounter: 1,
            bolesneCounter: 1,
            chwalebneCounter: 1,
            swiatlaCounter: 1
        };
        this.fetchState = this.fetchState.bind(this);
        this.fetchMysteries = this.fetchMysteries.bind(this);
        this.partChoose = this.partChoose.bind(this);
        this.returnedMystery = this.returnedMystery.bind(this);
    }

    async fetchState() {
        let response = await axios.get(endpoint + '/state')
        this.setState({
            radosneCounter: response.data[0].state,
            chwalebneCounter: response.data[1].state,
            swiatlaCounter: response.data[2].state,
            bolesneCounter: response.data[3].state,
        });
        // console.log(this.state.radosneCounter);
        // console.log(this.state.chwalebneCounter);
        // console.log(this.state.swiatlaCounter);
        // console.log(this.state.bolesneCounter);
    };


    partChoose() {
        // let today = new Date().getDay();
        // if (today === 1 || today === 6) {
        //     this.setState({ part: '/radosne' }, function () {
        //         console.log(this.state.part);
        //     });
        // } else if (today === 2 || today === 5) {
        //     this.setState({ part: '/bolesne' }, function () {
        //         console.log(this.state.part);
        //     });
        // } else if (today === 3 || today === 0) {
        //     this.setState({ part: '/chwalebne' }, function () {
        //         console.log(this.state.part);
        //     });
        // } else if (today === 4) {
        //     this.setState({ part: '/swiatla' }, function () {
        //         console.log(this.state.part);
        //     });
        // }
        // console.log(today);
        this.setState({ part: '/bolesne' });
    };

    async fetchMysteries() {
        let response = await axios.get(endpoint + this.state.part);
        return this.setState({ mysteries: response.data });
    };

    returnedMystery() {
        // let response = axios.get(endpoint + this.state.part);
        // let request = axios.post(endpoint + this.state.part, data: {
        // 
        // })
        // a
    }

    componentDidMount = () => {
        this.fetchState();
        this.partChoose();
        this.fetchMysteries();
        console.log(this.state.part);
    }

    render() {
        return (
            <div className="mysteries-view" >
                <h1>Dzisiejsza tajemnica:</h1>
                <div>
                    {/* <h3>{this.returnedMystery}</h3> */}
                    {this.state.mysteries.map(res =>
                        <h3 key={res.id}>{res.nr + '. ' + res.mystery}</h3>
                    )}
                </div>
            </div>
        )
    }
}
