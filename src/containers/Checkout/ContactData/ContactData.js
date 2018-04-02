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
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    valid: false
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    valid: false
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    rules: {
                        require: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    valid: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    rules: {
                        require: true
                    },
                    valid: false
                }
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

    checkValidity(rules, value) {
        let isValid = true;

        if (rules.require) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formData = {};
        for (let formElementKey in this.state.orderForm) {
            formData[formElementKey] = this.state.orderForm[formElementKey].value;
        }

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: formData
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
        const isValid = this.checkValidity(updatedOrderFormElement.validation.rules, updatedOrderFormElement.value);
        updatedOrderFormElement.validation.valid = isValid;
        updatedOrderForm[formElementKey] = updatedOrderFormElement;
        console.log(updatedOrderFormElement);

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
            <form onSubmit={this.placeOrderHandler}>
                {formElementArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.formElementValueChangedHandler(event, formElement.id)}
                    />
                })}
                <Button btnType="Success">Place Order</Button>
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