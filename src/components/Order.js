import React, { Component } from 'react';
import { formatPrice } from '../helpers';

export default class Order extends Component {
    constructor() {
        super();
        this.renderOrder =  this.renderOrder.bind(this);
    }
    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        if(!fish || fish.status === 'unavailable') {
            return <li key={key}> Sorry {fish ? fish.name : 'fish' } no longer available></li>
        } 
        return( 
            <li key={key}>
                <span>{count} lbs {fish.name}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }
    
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce( (prevtotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key]; 
            const isAvailable = fish && fish.status === 'available'; 
            if(isAvailable) {
                 return prevtotal + (count * fish.price) || 0;
            }
            return prevtotal;
        },0);
          

        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)} 
                    <li className="total">
                    <strong>Total</strong>
                     {formatPrice(total)}
                    </li>
                </ul>

               
            </div>
        )
    }
}
