import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import { getItems } from './servicios/product.service'
import { Producto, Usuario } from "./entidades/entidades"
const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([])
  const [Usuarios, seUsuarios] = useState([])
  const [CurrentUser, setCurrentUser]=useState('')
  useEffect(() => {
    const asyncQuerys = [getItems('productos'), getItems('usuarios')]
    Promise.all(asyncQuerys).then((res) => {
      setProducts(Producto.fromArray(res[0]))
      seUsuarios(Usuario.fromArray(res[1]))
    })
  }, [])


  const addToCart = (product) => {
  };

  const removeFromCart = (product) => {
  };

  const checkout = () => {
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Rico Tienda</h1>
      <div className="mb-4">
        <select onChange={handleUsuarioChange}>
          <option value="">Selecciona una Usuario</option>
          {Usuarios.map(Usuario => (
            <option key={Usuario.id} value={Usuario.id}>{Usuario.nombre}</option>
          ))}
        </select>
      </div>

      <ProductList products={products} onAddToCart={addToCart} />

      <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} onCheckout={checkout} />
    </div>
  );

  // Función handleUsuarioChange para manejar el cambio de la Usuario seleccionada
  function handleUsuarioChange(event) {
    const selectedUsuarioId = event.target.value;
    setCurrentUser(selectedUsuarioId)
  }

};

export default App;




