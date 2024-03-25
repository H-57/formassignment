import React, { createContext, useContext, useState, useEffect } from "react";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    console.log("run context");
    calculateTotal(products);
  }, []); // Run once on mount

  useEffect(() => {
    calculateTotal(products);
  }, [products]); // Run whenever products changes

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const calculateTotal = (updatedProducts) => {
    let sum = 0;
    updatedProducts.forEach((elm) => {
      sum = (elm.price * elm.quantity) + sum;
    });
    setTotal(sum);
  };

  return (
    <ProductContext.Provider value={{ products, updateProducts, Total }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export default ProductContext;