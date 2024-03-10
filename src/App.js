import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart'; 

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const products = [
    { id: 1, name: 'Bonsitter Lite', description: 'Producto Normal(u)', price: 269000, image: '/images/normal.PNG' },
    { id: 2, name: 'Concentrado', description: 'Producto por peso(g)', price: 15000, image: '/images/gramos.jpg' },
    { id: 3, name: 'Bonsitter Full', description: 'Producto con descuento (25%)', price: 629000, image: '/images/Descuento.jpg' },
  ];

  const addToCart = (product) => {
  };

  const removeFromCart = (product) => {
  };

  const checkout = () => {
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Rico Tienda</h1>
      {}
      <ProductList products={products} onAddToCart={addToCart} />
      
      {}
      <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} onCheckout={checkout} />

      {}
    </div>
  );
};

export default App;




