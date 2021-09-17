import React from 'react'
import './zrzutka.css';
import icons from '../icons/icons';

export default class Zrzutka extends React.Component {
    render() {
        return (
            <div className="zrzutka">
                <icons.Rose className="menu-icon" alt="menu" onClick={this.props.showMenu} />
                <iframe
                    title="wsparcie dzieła"
                    src="https://zrzutka.pl/y6nh7c/widget/13"
                    frameborder="0" scrolling="no">
                </iframe>
            </div>
        )
    }
}
