import React from 'react'
import { connect } from 'react-redux'

import Item from './item'
import '../css/branch.css'


class Branch extends React.Component {
    render() {
        const { map, id } = this.props,
            parentItem = map[id];
        return <div className="branch">
            <div className="parent-wrap">
                <Item {...parentItem} />
            </div>
            { parentItem.childIds.length > 0 && <div className="child-wrap">
                { parentItem.childIds.map(id => <Branch key={id} id={id} map={map} />) }
            </div> }
        </div>
    }
}


export default connect(state => state)(Branch)