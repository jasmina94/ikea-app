import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Category from '../components/Category';

const CATEGORIES = gql`
  query CATEGORIES {
    categories {
        id
        name
        description
    }
  }
`;

export default function Categories() {
    const { loading, error, data } = useQuery(CATEGORIES);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {loading && <p>Loading...</p>}

            {error && <p>Errror occured :(</p>}

            {data && data.categories.map((item) => {
                return <Category key={item.id} category={item} />
            })}
        </div>
    )
}
