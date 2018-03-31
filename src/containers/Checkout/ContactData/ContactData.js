import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        email: '',
        name: '',
        address: {
            street: '',
            postal: ''
        },
        loading: false
    }

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            deliveryMethod: '2 days business',
            customer: {
                name: 'Cu Bi',
                email: 'quytran288@gmail.com',
                address: {
                    street: '27925 122nd SE PL',
                    state: 'WA',
                    city: 'Kent'
                }
            }
        };

        console.log(data);

        axios.post('/orders.json', data)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        console.log(this.props);
        let formData = (
            <form action="">
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.placeOrderHandler}>Place Order</Button>
            </form>
        )

        if (this.state.loading) {
            formData = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {formData}
            </div>
        )
    }
}

export default ContactData;