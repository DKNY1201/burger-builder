import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            salad: 1,
            bacon: 1,
            cheese: 1
        }
    }
    render() {
        return <CheckoutSummary ingredients={this.state.ingredients} />
    }
}

export default Checkout;