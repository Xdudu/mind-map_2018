import React from 'react'
import { connect } from 'react-redux'

import { 
    editItem,
    addItem
} from '../actions'

import AddWrap from './add-wrap'

import '../css/item.css'


class Item extends React.Component {
    firstClickStamp = null
    
    dispatchEditOrSelect = e => {
        e.preventDefault();
        if (!this.firstClickStamp) {
            this.firstClickStamp = Date.now();
            // select
        } else {
            const timeStamp = Date.now();
            if (timeStamp - this.firstClickStamp < 300) {
                // edit
                this.toggleMask();
                this.textArea.focus();
                this.firstClickStamp = null;
            } else {
                this.firstClickStamp = timeStamp;
            }
        }
    }
    
    handleChange = e => {
        this.props.dispatch(editItem(this.props.id, e.target.value))
    }
    
    handlePossibleExit = e => {
        if (e.key === 'Enter') this.textArea.blur();
    }
    
    toggleMask = () => {
        if (this.mask.style.display === 'none') {
            this.mask.style.display = 'block';
        } else {
            this.mask.style.display = 'none';
        }
    }
    
    handleAddItem = actionType => {
        this.props.dispatch(addItem[actionType](this.props.id))
    }
    
    render() {
        return <div className="item">
            <textarea className="item-input"
                ref={textArea => this.textArea = textArea}
                value={this.props.text}
                onKeyDown={this.handlePossibleExit}
                onChange={this.handleChange}
                onBlur={this.toggleMask} />
            <label className="item-mask"
                ref={label => this.mask = label}
                onMouseDown={this.dispatchEditOrSelect} />
            { this.props.text }
            <AddWrap handleClick={this.handleAddItem} />
        </div>
    }
}

export default connect(state => state)(Item)