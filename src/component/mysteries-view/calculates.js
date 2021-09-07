import axios from "axios";
import React from "react";

// let startDay = Math.floor(Date.now() / 86400000);
// let daySpent = Math.floor(Date.now() / 86400000) % startDay;

export function returnMystery() {
}

export class StartingDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonVisibility: true,
            start: '2021-09-01'
        }
        this.PUTStartingDay = this.PUTStartingDay.bind(this);
    }

    async PUTStartingDay() {
        let date = new Date();
        let dateYear = date.getFullYear();
        let dateMonth = ("0" + (date.getMonth() + 1)).slice(-2);
        let dateDay = ("0" + date.getDate()).slice(-2);

        let today = dateYear + "-" + dateMonth + "-" + dateDay;

        await axios.put(process.env.REACT_APP_DB_URL + `/startingday/${today}`);
        this.setState({ buttonVisibility: false });
    }

    render() {
        return (
            <button onClick={this.PUTStartingDay} style={{ display: this.state.buttonVisibility ? 'block' : 'none' }}>Ustal datę rozpoczęcia</button>
        )
    }
}