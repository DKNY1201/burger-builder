import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice
        };

        axios.post('/orders.json', data)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    formElementValueChangedHandler = (event, formElementKey) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderFormElement = {...updatedOrderForm[formElementKey]};

        updatedOrderFormElement.value = event.target.value;
        updatedOrderForm[formElementKey] = updatedOrderFormElement;

        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let formData = (
            <form action="">
                {formElementArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.formElementValueChangedHandler(event, formElement.id)}
                    />
                })}
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