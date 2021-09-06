import axios from "axios";
import React from "react";

// let startDay = Math.floor(Date.now() / 86400000);
// let daySpent = Math.floor(Date.now() / 86400000) % startDay;

export function returnMystery() {
    console.log(new Date);
}

export class StartingDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonVisibility: true,
            start: '2021.09.01'
        }
        this.PUTStartingDay = this.PUTStartingDay.bind(this);
    }

    async PUTStartingDay() {
        let today = new Date;
        await axios.put(process.env.REACT_APP_DB_URL + '/startingday', `UPDATE startingDay SET startingDay = ${today} WHERE id = 1`);
        this.setState({ buttonVisibility: false });
    }

    render() {
        return (
            <button onClick={this.PUTStartingDay} style={{ display: this.state.buttonVisibility ? 'block' : 'none' }}>Ustal datę rozpoczęcia</button>
        )
    }
}