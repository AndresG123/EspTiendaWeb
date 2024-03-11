import React, { useEffect, useState } from 'react';

const ProductList = ({ products, onAddToCart, items }) => {
  const [quantities, setQuantities] = useState({});

  useEffect(()=>{
    if(items){
      products.map((product)=>{
        let item=items.find((element)=>element.producto==product.id)
        if(item){
          product.precioUnitario=item.precio_venta
          product.precioTotal=product.precioUnitario*item.cantidad
          setQuantities({ ...quantities, [product.id]: item.cantidad });
          return product
        }
      })
    }
    
  },[products, items])

  const handleIncrement = (productId) => {
    setQuantities({ ...quantities, [productId]: (quantities[productId] || 0) + 1 });
  };

  const handleDecrement = (productId) => {
    if (quantities[productId] > 0) {
      setQuantities({ ...quantities, [productId]: quantities[productId] - 1 });
    }
  };

  return (
    <div>
      <h2>Nuestros Productos</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">Precio: {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 3,
                  }).format(product.precioUnitario)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button className="btn btn-sm btn-secondary mr-2" onClick={() => handleDecrement(product.id)}>-</button>
                    <span>{quantities[product.id] || 0}</span>
                    <button className="btn btn-sm btn-secondary ml-2" onClick={() => handleIncrement(product.id)}>+</button>
                  </div>
                  <button className="btn btn-primary" onClick={() => onAddToCart(product, quantities[product.id] || 0)}>Agregar al carrito</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
