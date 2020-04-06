import React, { Component } from 'react';

import Button from '../../../components/UI/Button';
import axios from '../../../hoc/axios-orders/axios-orders';
import Spinner from '../../../components/UI/Spinner';
import classes from './styles.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        console.log(this.props.ingredients);
        console.log(this.props.price);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'CustomerName',
                address: {
                    street: 'Street Av. #123',
                    zipCode: '12345',
                    country: ''
                }
            }
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="code" placeholder="Zip Code" />
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}>
                    ORDER
                 </Button>
            </form>);

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;