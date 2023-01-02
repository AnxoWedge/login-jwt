import React from 'react';

const Item = ({ product, productDone, index, editProduct, deleteProduct }) => {
  return (
    <li key={product.name}>
      <input type="checkBox" checked={product.checked} onChange={() => productDone(index)} />
      <label>{product.name}</label>
      <label>{product.qty}</label>
      <button onClick={() => editProduct(index)}>Editar</button>
      <button onClick={() => deleteProduct(index)}>Lixo</button>
    </li>
  );
};

export default Item;