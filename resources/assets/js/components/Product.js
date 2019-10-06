import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import checkout from './Checkout'
import EditProduct from './EditProduct'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
const url = '/api/products'


export default class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: null,
            name: '',
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);


    }

    handleChange(event) {
        // console.log(event.target.value)
        this.setState({ name: event.target.value });
        console.log(this.state.name)
    }

    componentDidMount() {

        fetch(url, {
            headers: {
                Accept: 'application/json',
            },
            credentials: 'same-origin',
        })
            .then((response) => {
                if (!response.ok) throw Error([response.status, response.statusText].join(' '))

                return response.json()
            })
            .then((body) => {
                this.setState({
                    products: body,
                })
            })
            .catch((error) => alert(error))
    }


    AddProduct(event) {
        event.preventDefault();
        let productName = new FormData(event.target).get('productName')
        console.log(productName)

        let data = {
            name: productName,
        }

        fetch(url, {
            method: 'POST',
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

    ViewCart(){
        window.open("checkout")
    }

    EditPage(id){
        let link = './EditProduct/'+id;
        <BrowserRouter>
            <Route path={link} component={EditProduct}/>
        </BrowserRouter>
    }

    EditProduct(id){
        // event.preventDefault();
        let editUrl = url +"/"+id
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

    DeleteProduct(pID){
        console.log(pID)

        let deleteURL= url + "/"+pID
        let data = {
            id: pID,
        }

        fetch(deleteURL, {
            method: 'DELETE',
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
                    alert('Product Deleted')
                }
                else if (response.status === 422) {
                    alert('Validation Error')
                }
                else throw Error([response.status, response.statusText].join(' '))
            })
            .catch((error) => alert(error))
    }

    AddCart(pid){

        let cartUrl = '/api/checkouts'
        let data = {
            productID: pid,
            quantity:1
        }

        fetch(cartUrl, {
            method: 'POST',
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
                    alert('Added into cart')
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
        let content

        if (!products) {
            content = (
                <p>Loading data...</p>
            )
        }
        else if (products.length == 0) {
            content = (
                <p>No products in record</p>
            )
        }
        else {
            let items = products.map((products) =>
                <tr key={products.id}>
                    <td>{products.name}</td>
                    <td>
                        <input name="newproductName" type='text' value={this.state.name} onChange={this.handleChange}  placeholder="Enter new product name" visible="false"></input>
                        <button onClick= {()=> this.EditPage(products.id)}>Edit</button>
                       
                        {/* <form onSubmit={this.DeleteProduct}><input name='deleteButon' type='submit' value={products.id}>Delete</input></form> */}
                        <button onClick={() => this.DeleteProduct(products.id)}>Delete</button>
                        <button onClick={() => this.AddCart(products.id)}>Add to Cart</button>
                    </td>
                </tr>
            )

            content = (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                    {/* <form onSubmit={() => { this.AddProduct(this.input.val()) } }> */}
                    <form onSubmit={this.AddProduct}>
                        <input name="productName" type='text' value={this.state.name} onChange={this.handleChange} placeholder="Enter Product Name"></input>
                        <button type="submit">Add</button>
                    </form>

                    <button onClick={()=>this.ViewCart()}>View Cart</button>
                </div>
            )
        }

        return (
            <div className="content-wrapper">
                {content}
            </div>
        )
    }
}

(() => {
    let element = document.getElementById('content-products')
    if (element) {
        ReactDOM.render(<Products />, element)
    }
})()