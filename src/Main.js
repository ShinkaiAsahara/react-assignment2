import React, { useState } from 'react';
import search from './img/search.png';
import basket from './img/basket.png';
import edit from './img/edit.png';
import trash from './img/trash.png';
import './main.css';
import './modal.css';

function Main() {
    const [searchInput, setSearchInput] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const OpenModal = () => { 
        setModalOpen(!isModalOpen);
        setEditingProduct(null); 
    };

    const filterProductName = (e) => { 
        setSearchInput(e.target.value);
    };

    const DeleteProduct = (id) => { 
        setProducts(products.filter(product => product.id !== id));
    };

    const EditModal = (product) => { 
        setEditingProduct(product);
        setModalOpen(true);
    };

    const AddProductModal = (e) => {
        e.preventDefault();

        const newProduct = {  
            id: products.length + 1,
            name: e.target.productName.value,
            brand: e.target.brand.value,
            weight: e.target.weight.value,
            store: e.target.store.value,
            price: e.target.price.value,
        };

        setProducts([...products, newProduct]);
        OpenModal();
    };

    const EditProductModal = (e) => {
        e.preventDefault();
        const updatedProduct = {
            id: editingProduct.id,
            name: e.target.productName.value,
            brand: e.target.brand.value,
            weight: e.target.weight.value,
            store: e.target.store.value,
            price: e.target.price.value,
        };
        setProducts(products.map(product => product.id === editingProduct.id ? updatedProduct : product));
        OpenModal();
    };
    
    return (
        <>
            <header>    
                <div className='search-container'>
                    <img src={search} alt="Search" className='search' onClick={() => document.getElementById('searchInput').classList.toggle('show')} />
                    <input type='text' id='searchInput' placeholder='Search for products...' value={searchInput} onChange={filterProductName} className={searchInput ? 'show' : ''}/>
                </div>
                <span className='text-top'>ツ゚ Grocery List ツ゚</span>
                <a href=''><img src={basket} alt="Basket" className='basket'/></a>
            </header>

            <main>
                {products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase())).length === 0 ? (
                    <div className='no-products'>
                        <p className='no-products-text'>No items available. Please add some.</p>
                    </div>
                ) : (
                    products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase())).map(product => (
                        <div className='container' key={product.id}>
                            <img src={edit} alt="Edit" className='edit' onClick={() => EditModal(product)}/>
                            <img src={trash} alt="Delete" className='delete' onClick={() => DeleteProduct(product.id)} />
                            <div className='product-container'>
                                <div className='product-mid'>
                                    <p className='product-text'>{product.name}</p>
                                    <div className='flex-container'>
                                        <p className='brand'>{product.brand}</p>
                                        <span className='weight'>{product.weight}</span>
                                    </div>
                                    <p className='store'>{product.store}</p>
                                    <p className='price'>{product.price}</p>
                                </div>
                                <div className='product-right'>
                                    <button>Add Basket</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>

            <footer>
                <button onClick={OpenModal}>Add Item</button>
            </footer>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={OpenModal}>&times;</span>
                        <h2>{editingProduct ? 'Edit Grocery Item' : 'Add Grocery Item'}</h2>
                        <form onSubmit={editingProduct ? EditProductModal : AddProductModal}>
                            <label htmlFor="productName">Product Name:</label>
                            <input type="text" id="productName" name="productName" defaultValue={editingProduct ? editingProduct.name : ''}/>

                            <label htmlFor="brand">Brand:</label>
                            <input type="text" id="brand" name="brand" defaultValue={editingProduct ? editingProduct.brand : ''} />

                            <label htmlFor="price">Price:</label>
                            <input type="text" id="price" name="price" defaultValue={editingProduct ? editingProduct.price : ''} />

                            <label htmlFor="weight">Weight/Volume:</label>
                            <input type="text" id="weight" name="weight" defaultValue={editingProduct ? editingProduct.weight : ''} />

                            <label htmlFor="store">Store:</label>
                            <input type="text" id="store" name="store" defaultValue={editingProduct ? editingProduct.store : ''} />

                            <button type="submit" className="modal-btn">{editingProduct ? 'Update Item' : 'Add Item'}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Main;
