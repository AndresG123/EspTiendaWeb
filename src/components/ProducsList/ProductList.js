import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, onAddToCart, quantity }) => {
  const handleIncrement = () => {
    onAddToCart(product, 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onAddToCart(product, -1);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.nombre}</h5>
          <p className="card-text">{product.descripcion}</p>
          <p className="card-text">
            Precio: {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 3,
            }).format(product.precioUnitario)}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-sm btn-outline-secondary" onClick={handleDecrement}><FontAwesomeIcon icon={faMinus} /></button>
              <span className="mx-2">{quantity}</span>
              <button className="btn btn-sm btn-outline-secondary" onClick={handleIncrement}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products, onAddToCart, items }) => {
  const [quantities, setQuantities] = useState({});

  const handleChange = (producto, cantidad) => {
    onAddToCart(producto, cantidad)
    setQuantities({ ...quantities, [producto.id]: quantities[producto.id] + cantidad });
  }

  useEffect(() => {
    let updatedQuantities = {};
    if (items) {
      products.forEach((product) => {
        const item = items.find((element) => element.producto === product.id);
        if (item) {
          product.precioUnitario = item.precio_venta;
          product.precioTotal = product.precioUnitario * item.cantidad;
          updatedQuantities = { ...updatedQuantities, [product.id]: item.cantidad };
        }
      });
    }
    setQuantities(updatedQuantities);
  }, [products, items]);

  return (
    <div>
      <h2 className="mb-4">Nuestros Productos</h2>
      <div className="row">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleChange}
            quantity={quantities[product.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
