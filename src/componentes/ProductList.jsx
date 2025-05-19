import ProductItem from './ProductItem.jsx';

function ProductList({ productos, onEliminar, onEditar }) {
  return (
    <div>
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? <p>No hay productos.</p> : (
        <ul>
          {productos.map(producto => (
            <ProductItem 
              key={producto.id} 
              producto={producto} 
              onEliminar={onEliminar} 
              onEditar={onEditar} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
