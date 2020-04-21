import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

import classes from './styles.css';
import * as actionCreator from '../../store/actions';

const Auth = props => {
    const [isSignup, setIsSignup] = useState(true);
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Addres'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updateControls = {
            ...controls,
            [inputIdentifier]: {
                ...controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                touched: true
            }
        }
        setControls(updateControls);
    }

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignup);
    }

    const swithAuthModeHander = () => {
        setIsSignup(!isSignup);
    }

    const formElements = [];
    for (let key in controls) {
        formElements.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElements.map(element => (
        <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => inputChangedHandler(event, element.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    let redirectAuth = null
    if (props.isAuthenticated) {
        redirectAuth = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {redirectAuth}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                btnType="Danger"
                clicked={swithAuthModeHander}>
                SWITCH TO {isSignup ? 'SIGN-IN' : 'SIGN-UP'}
            </Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreator.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actionCreator.setAuthRedirectPath('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);