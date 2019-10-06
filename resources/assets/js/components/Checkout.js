import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink, withRouter } from "react-router-dom";


class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checkout: null,
        }
    }

    componentDidMount() {
        let url = '/api/checkouts'

        fetch(url, {
            headers: {
                Accept: 'application/json',
            },
            credentials: 'same-origin',
        })
        .then((response) => {
            if(!response.ok) throw Error([response.status, response.statusText].join(' '))

            return response.json()
        })
        .then((body) => {
            this.setState({
                checkout: body,
            })
        })
        .catch((error) => alert(error))
    }

    render() {
        const { checkout } = this.state

        let content

        if(!checkout) {
            content = (
                <p>Loading data...</p>
            )
        }
        else if(checkout.length == 0) {
            content = (
                <p>No checkout in record</p>
            )
        }
        else {
            let items = checkout.map((checkout) =>
                <tr key={ checkout.id }>
                    <td>{ checkout.productID }</td>
                    <td>{ checkout.quantity }</td>
                    <td>{checkout.created_at}</td>
                </tr>
            )

            content = (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Added On</th>
                            </tr>
                        </thead>
                        <tbody>
                            { items }
                        </tbody>
                    </table>
                </div>
            )
        }

        return (
            <div className="content-wrapper">
                { content }
            </div>
        )
    }
}

(() => {
    let element = document.getElementById('content-checkout')

    if(element) {
        ReactDOM.render(<Checkout />, element)
    }
})()

export default withRouter (Checkout);