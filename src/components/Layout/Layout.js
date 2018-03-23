import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showBackdrop: true
    }

    closeSideDrawHandler = () => {
        this.setState({showBackdrop: false});
    }

    render() {
        return (
            <Aux>
                <SideDrawer open={this.state.showBackdrop} closed={this.closeSideDrawHandler} />
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;