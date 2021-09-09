import axios from "axios";
import React from "react";
import Alert from "../alert/alert";
import Rose from "../icons/rose.svg";

export default class SetStartingDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonVisibility: true,
            start: '2000-01-01',
            alertVisibility: false
        }
        this.PUTStartingDay = this.PUTStartingDay.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    PUTStartingDay = async () => {
        let date = new Date();
        let dateYear = date.getFullYear();
        let dateMonth = ("0" + (date.getMonth() + 1)).slice(-2);
        let dateDay = ("0" + date.getDate()).slice(-2);

        let today = dateYear + "-" + dateMonth + "-" + dateDay;
        await axios.put(process.env.REACT_APP_DB_URL + `/startingday/${today}`);
        this.setState({
            buttonVisibility: false,
            alertVisibility: false
        });
        window.location.reload();
        alert('ustawiono nową datę rozpoczęcia!')
    }
    showAlert() {
        this.setState({ alertVisibility: true });
    }

    hideAlert() {
        this.setState({ alertVisibility: false });
    }

    render() {
        return (
            <>
                <Alert
                    alertOverlayDisplay={this.state.alertVisibility ? "flex" : "none"}
                    okClicked={this.PUTStartingDay}
                    cancelClicked={this.hideAlert}
                />
                <img src={Rose} onClick={this.showAlert} style={{ display: this.state.buttonVisibility ? 'block' : 'none' }} alt='reset starting day' />
            </>
        )
    }
}