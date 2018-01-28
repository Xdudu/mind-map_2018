import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'

import styles from '../css/tooltip.css'


class Tooltip extends React.Component {
    rootEl = null
    containerEl = null
    
    ROOT_ID = 'tool-tip-root'
    
    constructor(props) {
        super(props);
        
        this.rootEl = document.createElement('div');
        this.rootEl.id = this.ROOT_ID;
        document.getElementById('root').appendChild(this.rootEl);

        this.containerEl = document.createElement('div');
        this.containerEl.className = styles.tip;
    }

    componentDidMount() {
        this.rootEl.appendChild(this.containerEl);
        const { btnRect } = this.props,
            style = {
                top: `${btnRect.top}px`,
                left: `${btnRect.left}px`,
                transform: `translate(calc(${btnRect.width/2}px - 50%), calc(-100% - 10px))`
            };
        for (const k in style) {
            this.containerEl.style[k] = style[k]
        }
    }

    componentWillUnmount() {
        this.rootEl.removeChild(this.containerEl);
        this.rootEl.parentNode.removeChild(this.rootEl);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}

export default Tooltip