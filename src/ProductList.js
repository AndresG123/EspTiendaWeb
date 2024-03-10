import React from 'react';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div>
      <h2>Nuestros Productos</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              {}
              {/* <img
                src={product.image}
                className="card-img-left"
                alt={product.name}
                style={{ width: '150px', height: '200px' }}  // Tamano de las imagenes.
              /> */}
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">Precio: {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 3,
                  }).format(product.precioUnitario)}</p>
                
                
                <button
                  className="btn btn-primary"
                  onClick={() => onAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

