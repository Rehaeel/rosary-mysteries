import React from 'react'
import './alert.css';

export default class Alert extends React.Component {
    render() {
        return (
            <div style={{ display: this.props.alertOverlayDisplay }} className="alert-overlay" onClick={this.props.cancelClicked}>
                <div className="alert">
                    <h2>Czy chcesz rozpocząć od nowa?</h2>
                    <button onClick={this.props.okClicked}>Tak</button>
                    <button onClick={this.props.cancelClicked}>Anuluj</button>
                </div>
            </div >
        )
    }
}
