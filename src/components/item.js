import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { 
    selectItem,
    editItem,
    addItem
} from '../actions'

import AddBtnGrp from './add-btn-grp'

import styles from '../css/item.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Item extends React.Component {
    
    firstClickStamp = null
    clearClickStampTimer = null
    
    state = { showAddBtnGrp: false }
    
    handlePossibleExit = e => {
        if (e.key === 'Enter') this.input.blur();
    }
    
    handleChange = e => this.props.dispatch(editItem(this.props.content.id, e.target.value))
    
    toggleMask = () => this.mask.style.display = this.mask.style.display === 'none' ? 'block' : 'none'
    
    handleAddItem = type => this.props.dispatch(addItem[type](this.props.content.id))
    
    emitEditOrSelect = e => {
        e.preventDefault();
        if (!this.firstClickStamp) {
            this.firstClickStamp = Date.now();
            this.clearClickStampTimer = setTimeout(() => {
                // select
                this.firstClickStamp = null;
                this.props.dispatch(selectItem(this.props.content.id));
            }, 300)
        } else {
            // edit
            clearTimeout(this.clearClickStampTimer);
            this.firstClickStamp = null;
            this.toggleMask();
            this.input.focus();
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
        const { content, level, selectedId, beNumbered } = this.props,
            { id, text } = content;
            
        return <div styleName={`item-level-${level}${selectedId === id ? '-selected' : ''}`} 
            onMouseEnter={() => this.setState({ showAddBtnGrp: true })}
            onMouseLeave={() => this.setState({ showAddBtnGrp: false })}>
            
            <textarea styleName="item-input"
                ref={input => this.input = input}
                value={text}
                onKeyDown={this.handlePossibleExit}
                onChange={this.handleChange}
                onBlur={this.toggleMask} />
                
            <label styleName="item-mask"
                ref={label => this.mask = label}
                onMouseDown={this.emitEditOrSelect} />
                
            <AddBtnGrp color={this.getAddBtnColor(level)} 
                onlyRenderChildBtn={id === '0'}
                showGrp={this.state.showAddBtnGrp} 
                handleClick={this.handleAddItem} />
            
            { text }
            
            { beNumbered && <div styleName="item-no">{beNumbered}</div> }
        </div>
    }
    
}

export default connect(state => state)(Item)