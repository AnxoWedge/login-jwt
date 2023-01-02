import React, { useState } from 'react';
import './../css/productlist.css'

import EditItem from './EditItem';
import Item from './Item';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [qtyValue, setQtyValue] = useState('');

  const addProduct = () => {
    let productExists = false;
    // Check if the product already exists in the list
    for (const product of products) {
      if (product.name === inputValue) {
        product.qty += qtyValue;
        productExists = true;
        break;
      }
    }
    // If the product does not exist, add it to the list
    if (!productExists) {
      const newProduct = { name: inputValue, qty: qtyValue, checked: false };
      setProducts([...products, newProduct]);
    }
  
    setInputValue('');
    setQtyValue('');
  }

  const productDone = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].checked = !updatedProducts[index].checked;
    setProducts(updatedProducts);
  }

  const editProduct = (index, newName) => {
        // Make a copy of the to-buy list
        const newToBuyList = [...products];
        // Update the product at the given index
        newToBuyList[index].name = newName;
        // Update the to-buy list state
        setProducts(newToBuyList);
  }

  const deleteProduct = (index) => {
        // Make a copy of the to-buy list
        const newToBuyList = [...products];
        // Remove the product at the given index
        newToBuyList.splice(index, 1);
        // Update the to-buy list state
        setProducts(newToBuyList);
  }

  return (
    <div className="container" id="project">
      <p className="add-product">
        <label htmlFor="new-product">Adicionar Produto</label>
        <input id="new-product" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <input id="new-product-qty" type="number" value={qtyValue} onChange={(e) => setQtyValue(e.target.value)} />
        <button onClick={addProduct}>Adicionar</button>
      </p>
      <div className="listas">
        <div className="pc_container">
          <h3 className="shop-cat">Por comprar</h3>
          <ul id="por-comprar">
          {products.map((product, index) => (
             product.checked ? "" :
<Item />
            ))}
          </ul>
        </div>
        <div className="pc_container">
        <h3 className="shop-cat">Comprado</h3>
          <ul id="cesto">
            {products.map((product, index) => (
             product.checked ? 
              <li key={product.name}>
                <input type="checkBox" checked={product.checked} onChange={() => productDone(index)} />
                <label>{product.name}</label>
                <input type="text" />
                <label>{product.qty}</label>
                <input type="number" />
                <button onClick={() => editProduct(index)}>Editar</button>
                <button onClick={() => deleteProduct(index)}>Lixo</button>
              </li> 
            : "" ))}
          </ul>
          </div>
      </div>
    </div> )
}
export default ProductList;