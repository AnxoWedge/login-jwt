import React, { useState } from 'react';

const Item = ({ item, index, productDone, editProduct, deleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);// isEditing é um estado que armazena se o item está sendo editado ou não. O valor inicial é false.
  const [itemValue, setItemValue] = useState(item.item);// itemValue é um estado que armazena o valor do campo "item" do item. O valor inicial é o valor do campo "item" do item passado como propriedade.
  const [quantityValue, setQuantityValue] = useState(item.quantity);// quantityValue é um estado que armazena o valor do campo "quantity" do item. O valor inicial é o valor do campo "quantity" do item passado como propriedade.
  
  // handleSave é uma função que é chamada quando o utilizador clica no botão "Save". Ela chama a função editProduct passando o índice do item, o valor do campo "item" e o valor do campo "quantity" atuais. Depois, o estado isEditing é alterado para false.
  const handleSave = () => {
    editProduct(index, itemValue, quantityValue);
    setIsEditing(false);
  }
  // Se o item estiver sendo editado, é exibido um formulário para o utilizador editar o item.
  if (isEditing) {
    return (
      <li>
        {/* Os inputs disponíveis nestes item, quando alterados pelo utilizador, as funções productDone, setItemValue e setQuantityValue são chamadas com o índice do item e o valor correspondente.*/}
        <input type="checkBox" checked={item.completed} onChange={(e) => productDone(index, e.target.checked)} />
        <input value={itemValue} onChange={e => setItemValue(e.target.value)} />
        <input type="number" value={quantityValue} onChange={e => setQuantityValue(e.target.value)} />
        <button onClick={() => handleSave()}>Save</button>
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