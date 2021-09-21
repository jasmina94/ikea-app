import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import Product from '../components/Product';

const GetProductsByCategory = gql`
  query GetProducts($categoryId: Int!) {
    productByCategory(categoryId: $categoryId) {
        id
        name
        description
        description
        price
        inStock
        category {
            name
            description
        }
    }
  }
`;

export default function Products() {
    let { categoryId } = useParams();
    categoryId = parseInt(categoryId);

    const { loading, error, data } = useQuery(GetProductsByCategory, {
        variables: { categoryId }
    });

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {loading && <p>Loading...</p>}

            {error && <p>Errror occured :(</p>}

            {data && data.productByCategory.length !== 0 && data.productByCategory.map((item) => {
                return <Product key={item.id} product={item} />
            })}

            {data && data.productByCategory.length === 0 && <p>No products for this category.</p>}
        </div>
    )
}
