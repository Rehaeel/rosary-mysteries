import React from 'react'
import './zrzutka.css';
import icons from '../icons/icons';

export default class Zrzutka extends React.Component {
    constructor() {
        super();
        this.state = {
            componentVisibility: 'hidden'
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ componentVisibility: 'visible' }), 200)
    }
    render() {
        return (
            <div className={`zrzutka ${this.state.componentVisibility}`}>
                <icons.Rose className="menu-icon" alt="menu" onClick={this.props.showMenu} />
                <iframe
                    title="wsparcie dzieła"
                    src="https://zrzutka.pl/y6nh7c/widget/13"
                    frameBorder="0" scrolling="no">
                </iframe>
            </div>
        )
    }
}
