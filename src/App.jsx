import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import ProductForm from './componentes/ProductForms.jsx'; 
import ProductList from './componentes/ProductList.jsx';
import SearchBar from './componentes/SearchBar.jsx';

function App() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [producto_editar, setProducto_editar] = useState('');

  const agregarProducto = useCallback((nuevoProducto) => {
    const existe = productos.some(prod => prod.id === nuevoProducto.id);

    if (producto_editar) // entra si la variable tiene un valor y actualiza
    {
      modificar_producto(nuevoProducto);
      setProducto_editar(''); //limpia
      return;
    }

    if (existe) {
      alert('Ese ID ya existe en otro producto');
      return;
    }

    const productoConDescuento = {
      ...nuevoProducto,
      precioConDescuento: nuevoProducto.precioUnitario * (1 - nuevoProducto.descuento / 100),
    };

    setProductos(prevProductos => [...prevProductos, productoConDescuento]);
  }, [productos, producto_editar]);

  const eliminarProducto = useCallback((id) => {
    setProductos(prev => prev.filter(prod => prod.id !== id));
  }, []);

  const modificar_producto = useCallback((productoActualizado) => { //recibe productoActualiado que es el producto con los nuevos datos a guardar
    const productoConDescuento = {  //para que el prod tenga un nuevo precio
      ...productoActualizado,
      precioConDescuento: productoActualizado.precioUnitario * (1 - productoActualizado.descuento / 100),
    };

    setProductos(prevProductos =>
      prevProductos.map(producto => //recorre el arreglo
        producto.id === productoActualizado.id // compracion del id de prod con el que queremos editar
          ? productoConDescuento // reemplaza si es el que se está actualizando
          : producto // si no, lo deja igual
      )
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
      <ProductForm onGuardar={agregarProducto} editingProduct={producto_editar} />
      <ProductList productos={productosFiltrados} onEliminar={eliminarProducto} onEditar={setProducto_editar} />
    </div>
  );
}

export default App;
