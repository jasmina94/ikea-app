import React from 'react'
import { Link } from 'react-router-dom'

export default function Product({ product }) {
    return (
        <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card border-primary m-3" style={{ minWidth: "20rem", minHeight: "5rem", width: "400px", height: "500px" }}>
                <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <div style={{ height: "60px" }}>
                        <span>{product.description}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <div><img src="/photo.jpg" alt="Product" width={250} height={350} /></div>
                        <h5>{product.price}$</h5>
                    </div>
                </div>
            </div>
        </Link >
    )
}
