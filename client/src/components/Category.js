import React from 'react'

export default function Category(props) {
    return (
        <div className="card border-primary mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-header">{props.name}</div>
            <div className="card-body">
                <h4 className="card-title">Primary card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>

    )
}
