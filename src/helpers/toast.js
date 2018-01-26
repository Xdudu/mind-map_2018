import React from 'react'
import ReactDOM from 'react-dom'

class Toast extends React.Component {
    componentDidMount() {
        const toastNode = ReactDOM.findDOMNode(this);
        toastNode.style.opacity = 1;
        setTimeout(() => {
            toastNode.style.opacity = 0;
        }, 3000);
    }
    
    componentWillUnmount() {
        document.body.removeChild(document.getElementById('toast-root'))
    }
    
    handleUnmount = e => {
        if (e.target.style.opacity != 0) return
        
        ReactDOM.unmountComponentAtNode(e.target.parentNode);
    }
    
    render() {
        const style = {
            opacity: 0,
            position: 'fixed',
            left: '50%',
            bottom: '36px',
            transform: 'translateX(-50%)',
            minWidth: '300px',
            height: '36px',
            lineHeight: '36px',
            backgroundColor: 'rgba(144, 139, 125, .5)',
            borderRadius: '18px',
            color: '#fff',
            fontSize: '16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px 1px rgba(144, 139, 125, .2)',
            transition: 'all 120ms ease-out',
        };
        return <div style={style} onTransitionEnd={this.handleUnmount}>{this.props.text}</div>
    }
}

const showToast = text => {
    const toastRootNode = document.createElement('div');
    toastRootNode.id = 'toast-root';
    document.body.appendChild(toastRootNode);
    
    ReactDOM.render(<Toast text={text} />, toastRootNode)
}


export default showToast