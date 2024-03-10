import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShoppingCart = ({ cart, onRemoveFromCart, onCheckout }) => {
  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul className="list-group">
        {cart.map((item) => (
          <li key={item.product.sku} className="list-group-item d-flex justify-content-between align-items-center">
            {item.product.name} - Cantidad: {item.quantity}
            <span className="badge bg-primary rounded-pill">${item.total}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onRemoveFromCart(item.product)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <button className="btn btn-success" onClick={onCheckout}>
          Ir a pagar
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
