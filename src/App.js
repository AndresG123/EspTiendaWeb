import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import { getItems, postItem, getFilter, updateItem } from './servicios/product.service'
import { Producto, Usuario } from "./entidades/entidades"
import { SwalError } from './servicios/swal.service';

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentCart, setCurrentCart] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const [productosResponse, usuariosResponse] = await Promise.all([
      getItems('productos'),
      getItems('usuarios')
    ]);
    setProducts(Producto.fromArray(productosResponse));
    setUsers(Usuario.fromArray(usuariosResponse));
  };

  const handleUsuarioChange = async (event) => {
    const selectedUserId = event.target.value;
    setCurrentUser(selectedUserId);
    const filtros = {
      'usuario': selectedUserId,
      'estado': false
    };
    let carrito = await getFilter('carritoFilter', filtros);
    let itemsQuery;
    if (carrito.length === 0) {
      carrito = await postItem('carritos', {
        "usuario": parseInt(selectedUserId)
      });
    }
    setCurrentCart(carrito[0]);
    itemsQuery = await getFilter("ItemsFilter", {
      'carrito': carrito[0].id,
    });
    setItems(itemsQuery);
  };

  const addToCart = async (product, cantidad) => {
    if (!currentUser) {
      SwalError("Debes seleccionar un usuario primero...");
      return;
    }
    let item = items.find((element) => element.producto === product.id);
    if (item) {
      item.cantidad += parseInt(cantidad);
      await updateItem("items", item, item.id);
    } else {
      const newItemData = {
        "cantidad": cantidad,
        "precio_venta": product.precioUnitario,
        "descuento": 0,
        "carrito": currentCart.id,
        "producto": product.id
      };
      const newItem = await postItem("items", newItemData);
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = (product) => {
    // Implementación de remove del carrito
  };

  const checkout = () => {
    // Implementación de checkout
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Rico Tienda</h1>
      <div className="mb-4">
        <select onChange={handleUsuarioChange}>
          <option value="">Selecciona una Usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.nombre}</option>
          ))}
        </select>
      </div>

      <ProductList products={products} onAddToCart={addToCart} items={items} />

      <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} onCheckout={checkout} />
    </div>
  );
};

export default App;
