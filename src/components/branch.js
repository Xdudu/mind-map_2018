import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import Item from './item'
import styles from '../css/branch.css'


class Branch extends React.Component {
    render() {
        const { map, id } = this.props,
            parentItem = map[id];
        
        return <div className={id === '0' ? styles["branch-root"] : styles["branch"]}>
            <div className={styles["parent-item"]}>
                <Item level={this.props.level} content={parentItem} />
                { parentItem.childIds.length > 0 && <div className={styles["link"]} /> }
            </div>
            { parentItem.childIds.length > 0 && <div className={styles["child-items"]}>
                { parentItem.childIds.map(id => <Branch map={map} 
                    key={id} id={id} level={Math.min(3, this.props.level + 1)} />) }
            </div> }
        </div>
    }
}


export default connect(state => state)(Branch)