import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductForm from './componentes/ProductForms.jsx'; 

function App() {

  const [productos, setProductos] = useState([]);

  const agregarproducto = useCallback((nuevoproductito) => {

    const existe = productos.some(prod => prod.id === nuevoproductito.id);
    if (existe) {
      alert('Ese ID ya existe de algun producto');
      return;
    }

    const productodescuento = {
      ...nuevoproductito,
      precioConDescuento: nuevoproductito.precioUnitario * (1 - nuevoproductito.descuento / 100),
    };

    setProductos(prevProductos => [...prevProductos, productodescuento]);

  },[productos]);

  useEffect(() => {
    console.log('Lista de productos actualizada:', productos);
  }, [productos]);

  return (
    <div>
     <ProductForm onGuardar={agregarproducto}/>
    </div>
  );
}


export default App;

