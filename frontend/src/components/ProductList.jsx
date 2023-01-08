import React, { useState, useEffect, useContext } from 'react';
import './../css/productlist.css'

import Item from './Item'; // Compoenente "Item.jsx"
import { UserContext } from "../context/UserContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [qtyValue, setQtyValue] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useContext(UserContext);

  useEffect(() => {
    // Faz uma solicitação GET à API para obter a lista de itens.
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
  }, []); // O array vazio garante que este efeito só execute uma vez

  const addProduct = () => {
    let productExists = false;
    // Verifique se o produto já existe na lista
    for (const product of products) {
      if (product.name === inputValue) {
        product.quantity = Number(product.quantity) + Number(qtyValue);
        productExists = true;
        editProduct(products.indexOf(product), inputValue, product.quantity)
        break;
      }
    }
    // Se o produto não existir, adicione-o à lista
    if (!productExists) {
      // Faz uma solicitação POST à API para adicionar um novo item.
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
            // Atualiza a lista de itens no estado do componente.
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
  // Faz uma solicitação PUT à API para atualizar o status "completado" do item.
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
        // Atualiza a lista de itens no estado do componente.
        setProducts(result.items);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  const editProduct = (index, newItem, newQuantity) => {
    // Faz uma solicitação PUT à API para atualizar o item.
    console.log(newItem,newQuantity)
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
          // Atualiza a lista de itens no estado do componente.
          setProducts(result.items);
        },
        (error) => {
          console.error(error);
        }
      )
  }

  const deleteProduct = (index) => {
  // Faz uma solicitação DELETE à API para excluir um item.
  fetch(`/api/items/${index}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(
      (result) => {
        // Atualizar a lista de itens no estado do componente
        setProducts(result.items);
      },
      (error) => {
        console.error(error);
      }
    )
}


//Função de Logout, Limpa o token e desliga o utilizador do sistema.
  const handleLogout = () => {
    setToken("null");
    localStorage.removeItem("apiToken");
  };


  if (error) {
    handleLogout() // se não encontrar um token válido, faz logout 
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
          <input id="new-product" ref={node => itemInput = node} onChange={(e)=>setInputValue(e.target.value)} value={inputValue} placeholder=" Insere os seu produto..."/>
          <input id="new-product-qty" type="number" ref={node => quantityInput = node} onChange={(e)=>setQtyValue(e.target.value)} value={qtyValue} placeholder="1"/>
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