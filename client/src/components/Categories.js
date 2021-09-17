import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Category from './Category';

const CATEGORIES = gql`
  query CATEGORIES {
    categories {
        id
        name
    }
  }
`;

export default function Categories() {
    const { loading, error, data } = useQuery(CATEGORIES);

    return (
        <div className="container">
            {loading && <p>Loading...</p>}

            {error && <p>Errror occured :(</p>}

            {data && data.categories.map((item) => {
                return <Category key={item.id} name={item.name} />
            })}
        </div>
    )
}
