import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject} from '../../../shared/utility';

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
                        require: true,
                        isEmail: true
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

        if (rules.isEmail) {
            const emailRegex = /^\S+@\S+\.\S+$/;
            isValid = emailRegex.test(value);
        }

        return isValid;
    }

    placeOrderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementKey in this.state.orderForm) {
            formData[formElementKey] = this.state.orderForm[formElementKey].value;
        }

        const data = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: formData,
            userId: this.props.userId
        };

        this.props.onPurchaseOrder(data, this.props.tokenId);
    }

    formElementValueChangedHandler = (event, formElementKey) => {
        const updatedOrderFormElement = updateObject(this.state.orderForm[formElementKey], {
            value: event.target.value,
            validation: updateObject(this.state.orderForm[formElementKey].validation, {
                valid: this.checkValidity(this.state.orderForm[formElementKey].validation.rules,
                    event.target.value)
            }),
            touch: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [formElementKey]: updatedOrderFormElement
        });

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

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseOrder: (orderData, tokenId) => dispatch(actions.purchaseOrder(orderData, tokenId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));