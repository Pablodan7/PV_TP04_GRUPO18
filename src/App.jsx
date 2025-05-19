import { useState, useEffect, useCallback } from 'react';
import './App.css';
import ProductForm from './componentes/ProductForms.jsx'; 
import ProductList from './componentes/ProductList.jsx';

function App() {
  const [productos, setProductos] = useState([]);

  const agregarProducto = useCallback((nuevoProducto) => {
    const existe = productos.some(prod => prod.id === nuevoProducto.id);
    if (existe) {
      alert('Ese ID ya existe en otro producto');
      return;
    }

    const productoConDescuento = {
      ...nuevoProducto,
      precioConDescuento: nuevoProducto.precioUnitario * (1 - nuevoProducto.descuento / 100),
    };

    setProductos(prevProductos => [...prevProductos, productoConDescuento]);
  }, [productos]);

  const eliminarProducto = useCallback((id) => {
    setProductos(prev => prev.filter(prod => prod.id !== id));
  }, []);

  const modificarProducto = useCallback((productoActualizado) => {
    setProductos(prev =>
      prev.map(prod => (prod.id === productoActualizado.id ? productoActualizado : prod))
    );
  }, []);

  useEffect(() => {
    console.log('Lista de productos actualizada:', productos);
  }, [productos]);

  return (
    <div>
      <ProductForm onGuardar={agregarProducto} />
      <ProductList productos={productos} onEliminar={eliminarProducto} onEditar={modificarProducto} />
    </div>
  );
}

export default App;
