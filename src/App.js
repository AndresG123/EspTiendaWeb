import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import { getItems, postItem, getFilter, updateItem } from './servicios/product.service'
import { Producto, Usuario } from "./entidades/entidades"
import { SwalError } from './servicios/swal.service';
import Swal from 'sweetalert2';
const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([])
  const [Usuarios, seUsuarios] = useState([])
  const [CurrentUser, setCurrentUser] = useState(null)
  const [CurrentCarrito, setCurrentCarrito] = useState(null)
  useEffect(() => {

    const asyncQuerys = [getItems('productos'), getItems('usuarios')]
    Promise.all(asyncQuerys).then((res) => {
      setProducts(Producto.fromArray(res[0]))
      seUsuarios(Usuario.fromArray(res[1]))
    })
  }, [])


  const addToCart = async (product, cantidad) => {
    if (CurrentUser) {
      const filtros = {
        'carrito': CurrentCarrito.id,
        'producto': product.id
      }
      let item=await getFilter("ItemsFilter",filtros)
      if(item.length>0){
        let itemUpdate=item[0]
        itemUpdate.cantidad+=parseInt(cantidad)
        console.log(itemUpdate)
        await updateItem("items", itemUpdate,itemUpdate.id)
      }else{
        let data = {
          "cantidad": cantidad,
          "precio_venta": product.precioUnitario,
          "descuento": 0,
          "carrito": CurrentCarrito.id,
          "producto": product.id
        }
        await postItem("items", data)
      }
    } else {
      SwalError("Debes seleccionar un usuario primero...")
    }
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

  async function handleUsuarioChange(event) {
    const selectedUsuarioId = event.target.value;
    setCurrentUser(selectedUsuarioId)
    
    const filtros = {
      'usuario': selectedUsuarioId,
      'estado': false
    }
    let carrito = await getFilter('carritoFilter', filtros)
    if (carrito.length === 0) {
      carrito = await postItem('carritos', {
        "usuario": parseInt(selectedUsuarioId)
      })
    }
    setCurrentCarrito(carrito[0])
  }

};

export default App;




