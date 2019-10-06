import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from "react-router-dom";
const url = '/api/products'


export default class EditProduct extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            products: null,
            name: '',
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        console.log(window.location)

    }

    handleChange(event) {
        // console.log(event.target.value)
        this.setState({ name: event.target.value });
        console.log(this.state.name)
    }


    EditProduct(id) {
        // event.preventDefault();
        let editUrl = url + "/" + id
        let newProductName = new FormData(event.target).get('newproductName')

        let data = {
            id: id,
            name: newProductName,
        }

        fetch(editUrl, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

                // Include Authorization header with Bearer token if token authentication is required...
            },
            credentials: 'same-origin',
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 201) {
                    alert('Product Saved')
                }
                else if (response.status === 422) {
                    alert('Validation Error')
                }
                else throw Error([response.status, response.statusText].join(' '))
            })
            .catch((error) => alert(error))
    }


    render() {
        const { products } = this.state

        return (
            <div className="content-wrapper">
                <input name="newproductName" type='text' value={this.state.name} onChange={this.handleChange} placeholder="Enter new product name"></input>
                <button onClick={() => this.EditProduct(products.id)}>Edit</button>
            </div>
        )
    }
}


(() => {
    let element = document.getElementById('content-update')
    if (element) {
        ReactDOM.render(<Products />, element)
    }
})()

