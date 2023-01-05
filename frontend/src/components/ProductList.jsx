import React, { useState, useEffect, useContext } from 'react';
import './../css/productlist.css'

import Item from './Item';
import { UserContext } from "../context/UserContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [qtyValue, setQtyValue] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [token,] = useContext(UserContext);

  useEffect(() => {
    // Make a GET request to the API to get the list of items
    fetch('/api/items', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProducts(result.items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []); // The empty array ensures that this effect only runs once

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
      // Make a POST request to the API to add a new item
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ item: inputValue, quantity: qtyValue }),
      })
        .then(res => res.json())
        .then(
          (result) => {
            // Update the list of items in the component's state
            setProducts(result.items);
          },
          (error) => {
            console.error(error);
          }
        )
    }
  
    setInputValue('');
    setQtyValue('');
  }

  const productDone = (index, isChecked) => {
  // Make a PUT request to the API to update the item's "completed" status
  fetch(`/api/items/${index}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ completed: isChecked }),
  })
    .then(res => res.json())
    .then(
      (result) => {
        // Update the list of items in the component's state
        setProducts(result.items);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  const editProduct = (index, newItem, newQuantity) => {
    // Make a PUT request to the API to update the item
    fetch(`/api/items/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ item: newItem, quantity: newQuantity }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          // Update the list of items in the component's state
          setProducts(result.items);
        },
        (error) => {
          console.error(error);
        }
      )
  }

  const deleteProduct = (index) => {
  // Make a DELETE request to the API to delete an item
  fetch(`/api/items/${index}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(
      (result) => {
        // Update the list of items in the component's state
        setProducts(result.items);
      },
      (error) => {
        console.error(error);
      }
    )
}

  if (error) {
    return <div className='error'>Error: Your key has been expired, please logout and login again</div>;
  } else if (!isLoaded) {
    return <div className='loading'>Loading...</div>;
  } else {
    let itemInput, quantityInput;
    return (
      <div className="container" id="project">
        <form  className="add-product" onSubmit={e => {
          e.preventDefault();
          addProduct(itemInput.value, quantityInput.value);
        }}>
          <input id="new-product" ref={node => itemInput = node} onChange={(e)=>setInputValue(e.target.value)} />
          <input id="new-product-qty" type="number" ref={node => quantityInput = node} onChange={(e)=>setQtyValue(e.target.value)}/>
          <button type="submit">Add</button>
        </form>
        <div className="listas">
          <div className="pc_container">
            <h3 className="shop-cat">Por comprar</h3>
            <ul id="por-comprar">
            {products.map((item, index) => (
              item.completed ? "" :
                <Item
                  key={index}
                  item={item}
                  index={index}
                  productDone={productDone}
                  editProduct={editProduct}
                  deleteProduct={deleteProduct}
                />
              ))}
            </ul>
          </div>
          <div className="pc_container">
          <h3 className="shop-cat">Comprado</h3>
            <ul id="cesto">
              {products.map((item, index) => (
              item.completed ? 
                <Item
                  key={index}
                  item={item}
                  index={index}
                  productDone={productDone}
                  editProduct={editProduct}
                  deleteProduct={deleteProduct}
                />
              : "" ))}
            </ul>
            </div>
        </div>
      </div> )
  }
}
export default ProductList;