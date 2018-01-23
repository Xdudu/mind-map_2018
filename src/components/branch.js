import React from 'react'
import { connect } from 'react-redux'

import Item from './item'
import '../css/branch.css'


class Branch extends React.Component {
    render() {
        const { map, id } = this.props,
            parentItem = map[id];
        return <div className={id === '0' ? "branch-root" : "branch"}>
            <div className="parent-item">
                <Item {...parentItem} />
            </div>
            { parentItem.childIds.length > 0 && <div className="child-items">
                { parentItem.childIds.map(id => <Branch key={id} id={id} map={map} />) }
            </div> }
        </div>
    }
}


export default connect(state => state)(Branch)