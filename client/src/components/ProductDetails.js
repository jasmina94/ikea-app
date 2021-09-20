import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { FiHeart } from 'react-icons/fi';

const GetProductDetails = gql`
  query GetProductDetails($productId: Int!) {
    product(id: $productId) {
        name
        description
        inStock
        price
        category {
            name
        }
    }
}`;

export default function ProductDetails() {
    let { productId } = useParams();
    productId = parseInt(productId);

    const { loading, error, data } = useQuery(GetProductDetails, {
        variables: { productId }
    });

    return (
        <div className="d-flex flex-row">
            {loading && <p>Loading...</p>}

            {error && <p>Error occured :( </p>}

            {data && <>
                <div className="col-xl-7 d-flex p-4 justify-content-center" style={{ backgroundColor: 'lightgray' }}>
                    <div className="d-flex m-2">
                        <img src='/photo.jpg' alt='product' height={400} width={300} />
                    </div>
                    <div className="d-flex m-2">
                        <img src='/photo.jpg' alt='product' height={400} width={300} />
                    </div>
                </div>
                <div className="col-xl-5">
                    <div className="d-flex flex-column p-4" style={{ backgroundColor: 'lightsalmon' }}>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between">
                                <h4>{data.product.name}</h4>
                                <h4>{data.product.price}$</h4>
                            </div>
                            <p>{data.product.description}</p>
                            <hr />
                            <div>
                                <p>In stock: {data.product.inStock ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <button style={{ border: 'none', borderRadius: '3px', padding: '4px' }}>Add to cart</button>
                                <a href="/" title="Add to favorites" style={{ color: 'black' }}>
                                    <span>
                                        <FiHeart size={28} />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}
