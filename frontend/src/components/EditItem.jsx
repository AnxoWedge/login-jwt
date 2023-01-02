import React, { useState } from 'react';

const EditItem = ({ product, productDone, index, editProduct, deleteProduct }) => {
  const [name, setName] = useState(product.name);
  const [qty, setQty] = useState(product.qty);
  const [checked, setChecked] = useState(product.checked);

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(index, name, qty, checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="checkBox" checked={checked} onChange={() => setChecked(!checked)} />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
      <button type="submit">Salvar</button>
      <button onClick={() => deleteProduct(index)}>Lixo</button>
    </form>
  );
};

export default EditItem;
