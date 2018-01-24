import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { 
    editItem,
    addItem
} from '../actions'

import AddBtnGrp from './add-btn-grp'

import styles from '../css/item.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Item extends React.Component {
    
    firstClickStamp = null
    
    state = { showAddBtnGrp: false }
    
    handlePossibleExit = e => {
        if (e.key === 'Enter') this.input.blur();
    }
    
    handleChange = e => {
        console.log('sdf');
        this.props.dispatch(editItem(this.props.id, e.target.value))
    }
    
    toggleMask = () => this.mask.style.display = this.mask.style.display === 'none' ? 'block' : 'none'
    
    handleAddItem = type => this.props.dispatch(addItem[type](this.props.id))
    
    emitEditOrSelect = e => {
        e.preventDefault();
        if (!this.firstClickStamp) {
            this.firstClickStamp = Date.now();
            // select
        } else {
            const timeStamp = Date.now();
            if (timeStamp - this.firstClickStamp < 300) {
                // edit
                this.toggleMask();
                this.input.focus();
                this.firstClickStamp = null;
            } else {
                this.firstClickStamp = timeStamp;
            }
        }
    }
    
    getStyleName = level => {
        switch (level) {
            case 0:
                return "item-level-0"
            case 1:
                return "item-level-1"
            case 2:
                return "item-level-2"
            default:
                return "item-level-3"
        }
    }
    
    getAddBtnColor = level => {
        switch (level) {
            case 0:
                return '#4a2d5d'
            case 1:
                return '#fbc2a4'
            case 2:
                return '#c2e3d2'
            default:
                return '#a39e8a'
        }
    }
    
    render() {
        return <div styleName={this.getStyleName(this.props.level)} 
            onMouseEnter={() => this.setState({ showAddBtnGrp: true })}
            onMouseLeave={() => this.setState({ showAddBtnGrp: false })}>
            
            <textarea styleName="item-input"
                ref={input => this.input = input}
                value={this.props.text}
                onKeyDown={this.handlePossibleExit}
                onChange={this.handleChange}
                onBlur={this.toggleMask} />
                
            <label styleName="item-mask"
                ref={label => this.mask = label}
                onMouseDown={this.emitEditOrSelect} />
                
            <AddBtnGrp color={this.getAddBtnColor(this.props.level)} 
                showGrp={this.state.showAddBtnGrp} handleClick={this.handleAddItem} />
            
            { this.props.text }
        </div>
    }
    
}

export default connect(state => state)(Item)