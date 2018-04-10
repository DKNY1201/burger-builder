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
                },
                touch: false
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
                },
                touch: false
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
                },
                touch: false
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
                },
                touch: false
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
                },
                touch: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {
                    rules: {
                    },
                    valid: true
                },
                value: 'fastest'
            }
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(rules, value) {
        if (!rules) {
            return true;
        }

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
        updatedOrderFormElement.touch = true;
        updatedOrderForm[formElementKey] = updatedOrderFormElement;

        let formIsValid = true;

        for (let formElementKey in updatedOrderForm) {
            formIsValid = updatedOrderForm[formElementKey].validation.valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        valid={formElement.config.validation && formElement.config.validation.valid}
                        shouldValidate={formElement.config.validation}
                        touch={formElement.config.touch}
                        changed={(event) => this.formElementValueChangedHandler(event, formElement.id)}
                    />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Place Order</Button>
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