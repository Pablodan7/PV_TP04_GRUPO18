import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import ProductForm from './componentes/ProductForms.jsx'; 
import ProductList from './componentes/ProductList.jsx';
import SearchBar from './componentes/SearchBar.jsx';

function App() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

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

const productosFiltrados = useMemo(() => {
  return productos.filter(producto => {
    const termino = searchTerm.toLowerCase();
    const descripcion = producto.descripcion?.toLowerCase() ?? '';
    const id = String(producto.id).toLowerCase();

    return descripcion.includes(termino) || id.includes(termino);
  });
}, [productos, searchTerm]);



  useEffect(() => {
    console.log('Lista de productos actualizada:', productos);
  }, [productos]);

  return (
    <div className="app-container">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ProductForm onGuardar={agregarProducto} />
      <ProductList productos={productosFiltrados} onEliminar={eliminarProducto} onEditar={modificarProducto} />
    </div>
  );
}

export default App;
