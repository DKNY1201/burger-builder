import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as errors from '../../utility/error-code-to-message';

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
        formIsValid: false,
        isSignUp: true
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
        this.props.onAuth(this.state.controls['email'].value,
            this.state.controls['password'].value,
            this.state.isSignUp);
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

        // for (let formElementKey in updatedOrderForm) {
        //     formIsValid = updatedOrderForm[formElementKey].validation.valid && formIsValid;
        // }

        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
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

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMgs = null;
        if (this.props.error) {
            errorMgs = <p style={{color: 'red'}}>{errors[this.props.error.message]}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMgs}
                {form}
                <Button btnType="Danger" clicked={this.switchModeHandler}>Switch to {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.tokenId,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

