import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmountNetto: 0,
  totalAmountBrutto: 0,
  addItem: (item) => {},
  removeItem: (id, subCat) => {},
});

export default CartContext;
