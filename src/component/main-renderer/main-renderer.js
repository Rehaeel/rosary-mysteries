import React from 'react'
import MysteriesView from '../mysteries-view/mysteries-view.js';
import './main-renderer.css';

export default class MainRenderer extends React.Component {
    render() {
        return (
            <div className="main-renderer">
                
                <MysteriesView />
            </div>
        )
    }
}
