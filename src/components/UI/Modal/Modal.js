import React, {Component} from 'react';

import classes from './Modal.css';
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal} style={{
                    'transform': this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    'opacity': this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;