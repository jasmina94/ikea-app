import React, { useState } from 'react'
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

const GetCategories = gql`
  query CATEGORIES {
    categories {
        id
        name
    }
  }
`;

const AddCategory = gql`
  mutation ADD_CATEGORY(
        $name: String!
        $description: String
    ) {
        addCategory(name: $name, description: $description) {
            id
            name
            description
    }
  }
`;

export default function AdminPanel() {
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [categoryFormState, setCategoryFormState] = useState({
        name: "",
        description: ""
    });

    const { getCategoriesLoading, getCategoriesError, getCategoriesData } = useQuery(GetCategories);

    const [addCategory] = useMutation(AddCategory, {
        variables: {
            name: categoryFormState.name,
            description: categoryFormState.description
        },
        onCompleted: (data) => {
            alert(`New category with id ${data.addCategory.id} is added.`);
        }
    });

    const toggleAddProduct = () => {
        setShowAddCategoryForm(false);
        setShowAddProductForm(!showAddProductForm);
    }

    const toggleAddCategory = () => {
        setShowAddProductForm(false);
        setShowAddCategoryForm(!showAddCategoryForm);
    }

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        addCategory();
    }

    const handleProductSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h4>Admin panel</h4>

            <div className="d-flex flex-row justify-content-between w-25">
                <button className="btn btn-light mb-4" onClick={toggleAddProduct}>New product</button>
                <button className="btn btn-light mb-4" onClick={toggleAddCategory}>New category</button>
            </div>

            {showAddCategoryForm &&
                <>
                    <form onSubmit={handleCategorySubmit}>
                        <legend>Add category</legend>
                        <div className="form-group row mb-3">
                            <label htmlFor="categoryName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="categoryName"
                                    onChange={(e) => setCategoryFormState({ ...categoryFormState, name: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="categoryDescription" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="categoryDescription"
                                    onChange={(e) => setCategoryFormState({ ...categoryFormState, description: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group mt-4">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </>
            }

            {showAddProductForm &&
                <>
                    <form onSubmit={handleProductSubmit}>
                        <legend>Add product</legend>
                        <div className="form-group row mb-3">
                            <label htmlFor="productName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="productName" />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="productDescription" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="productDescription" />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="productPrice" className="col-sm-2 col-form-label">Price</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="productPrice" />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="productCategory" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-10">
                                <select className="form-select" id="productCategory">
                                    {getCategoriesData && getCategoriesData.categories.map((item) =>
                                        <option key={item.id} valie={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="productInStock" />
                            <label className="form-check-label" htmlFor="productInStock">Product is in stock</label>
                        </div>
                        <div className="form-group mt-4">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </>}
        </div >
    )
}
