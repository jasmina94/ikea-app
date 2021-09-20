import React from 'react';
import { Link } from 'react-router-dom';

export default function Category({ category }) {
    return (
        <div className="card border-primary m-3" style={{ minWidth: "20rem", minHeight: "5rem", width: "400px" }}>
            <div className="card-body">
                <h4 className="card-title">{category.name}</h4>
                <p className="card-text">{category.description}</p>
                <p><Link to={`/category/${category.id}/products`}>See products...</Link></p>
            </div>
        </div>
    )
}
