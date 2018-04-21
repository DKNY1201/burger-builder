import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <SideDrawer isAuthenticated={this.props.isAuth} open={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawerHandler} />
                <Toolbar isAuthenticated={this.props.isAuth} toggleSideDrawer={this.toggleSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.tokenId !== null
    }
}

export default connect(mapStateToProps)(Layout);