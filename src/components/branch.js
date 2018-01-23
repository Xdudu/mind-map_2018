import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import Item from './item'
import styles from '../css/branch.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Branch extends React.Component {
    render() {
        const { map, id } = this.props,
            parentItem = map[id];
        
        const DecoratedBranch = connect(state => state)(
            CSSModules(Branch, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
        );
        
        return <div styleName={id === '0' ? "branch-root" : "branch"}>
            <div styleName="parent-item">
                <Item {...parentItem} />
            </div>
            { parentItem.childIds.length > 0 && <div styleName="child-items">
                { parentItem.childIds.map(id => <DecoratedBranch key={id} id={id} />) }
            </div> }
        </div>
    }
}


export default connect(state => state)(Branch)