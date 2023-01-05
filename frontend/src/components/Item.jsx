import React, { useState } from 'react';

const Item = ({ item, index, productDone, editProduct, deleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemValue, setItemValue] = useState(item.item);
  const [quantityValue, setQuantityValue] = useState(item.quantity);

  const handleSave = () => {
    editProduct(index, itemValue, quantityValue);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li>
        <input type="checkBox" checked={item.completed} onChange={(e) => productDone(index, e.target.checked)} />
        {item.username}: 
        <input value={itemValue} onChange={e => setItemValue(e.target.value)} />
        <input type="number" value={quantityValue} onChange={e => setQuantityValue(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </li>
    );
  } else {
    return (
      <li>
        <input type="checkBox" checked={item.completed} onChange={(e) => productDone(index, e.target.checked)} />
        <label>{item.name}</label>
        <label>{item.quantity}</label>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => deleteProduct(index)}>Delete</button>
      </li>
    );
  }
}

export default Item;