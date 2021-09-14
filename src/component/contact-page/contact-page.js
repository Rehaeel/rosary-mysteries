import React from 'react'
import './contact-page.css';
import Rose from '../icons/rose.svg'

export default class ContactPage extends React.Component {
    render() {
        return (
            <div className="contact-page">
                <img className="menu-icon" src={Rose} alt="menu" onClick={this.props.showMenu} />
                <h2>Napisz swoją uwagę:</h2>
                <form className="contact-form">
                    <input placeholder="Imię" />
                    <input placeholder="Mail" />
                    <textarea placeholder="Wiadomość" />
                    <button type="submit">Wyślij</button>
                </form>
            </div>
        )
    }
}
