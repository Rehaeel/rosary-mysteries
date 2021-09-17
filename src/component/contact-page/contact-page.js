import React from 'react'
import './contact-page.css';
import Rose from '../icons/rose.svg'
import emailjs from 'emailjs-com';

export default class ContactPage extends React.Component {
    constructor() {
        super();
        this.state = {
            formVisibility: true
        }
        this.sendEmail = this.sendEmail.bind(this);
    }

    sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_6f2wh6e', 'rozaniec-app', e.target, 'user_FYozYYCsMf5VcHRsN4W14')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        this.setState({ formVisibility: !this.state.formVisibility })
    }

    render() {
        return (
            <div className="contact-page">
                <img className="menu-icon" src={Rose} alt="menu" onClick={this.props.showMenu} />
                <h2 style={{ display: this.state.formVisibility ? 'block' : 'none' }}>Napisz swoją uwagę:</h2>
                <form
                    className="contact-form"
                    onSubmit={this.sendEmail}
                    style={{ display: this.state.formVisibility ? "flex" : "none" }}
                >
                    <input type="text" name="name" placeholder="Imię" />
                    <input type="email" name="email" placeholder="Mail" />
                    <textarea name="message" placeholder="Wiadomość" />
                    <button type="submit">Wyślij</button>
                </form>
                <h3
                    className="thank-you"
                    style={{ display: this.state.formVisibility ? 'none' : "block" }}
                >
                    Dziękuję za wkład w udoskonalenie aplikacji.<br />
                    Do usłyszenia!
                </h3>
            </div>
        )
    }
}
