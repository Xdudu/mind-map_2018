import React from 'react'

import AddBtn from './add-btn'


class AddBtnGrp extends React.Component {
    state = { hoverOn: '' }
    
    handleHoverChange = type => this.setState({ hoverOn: !this.state.hoverOn ? type : '' })
    
    render() {
        const { color, showGrp, handleClick } = this.props;
        const { hoverOn } = this.state;
        
        return <div style={{ fill: color }}>
            { ['BEFORE', 'AFTER', 'PARENT', 'CHILD'].map(type => <AddBtn key={type}
                type={type}
                show={showGrp && hoverOn === '' || hoverOn === type}
                handleToggleHide={this.handleHoverChange}
                handleClick={() => handleClick(type)} />) }
        </div>
    }
} 

export default AddBtnGrp