import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions';

class Auth extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    rules: {
                        require: true,
                        minLength: 8
                    },
                    valid: false
                },
                touch: false
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

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls['email'].value, this.state.controls['password'].value);
    }

    formElementValueChangedHandler = (event, formElementKey) => {
        const updatedOrderForm = {...this.state.controls};
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

        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];

        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.authHandler}>
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                {form}
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);

