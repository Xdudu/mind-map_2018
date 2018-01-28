import React from 'react'
import CSSModules from 'react-css-modules'

import Tooltip from './tooltip'

import styles from '../css/tool-btn.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class ToolBtn extends React.Component {
    state = { 
        clientRect: {},
        showTip: false
    }
    
    render() {
        const { name, shortcut, svgPath, handleClick } = this.props;
        const { clientRect, showTip } = this.state;
        
        return <div styleName="btn" onClick={handleClick}
            onMouseLeave={() => this.setState({ showTip: false })}
            onMouseEnter={e => {
                this.setState({ 
                    showTip: true,
                    clientRect: e.currentTarget.getBoundingClientRect()
                })
            }}>
                <svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d={svgPath} />
                </svg>
                { showTip && <Tooltip btnRect={clientRect}>
                    <b>{name}</b>
                    <div>{shortcut}</div>
                </Tooltip> }
        </div>
    }
}


export default ToolBtn