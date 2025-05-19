function ProductItem({ producto, onEliminar, onEditar }) {
  const precioConDescuento = producto.precioUnitario * (1 - producto.descuento / 100);

  return (
    <li>
      <p><strong>ID:</strong> {producto.id}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio Unitario:</strong> ${producto.precioUnitario.toFixed(2)}</p>
      <p><strong>Descuento:</strong> {producto.descuento}%</p>
      <p><strong>Precio con Descuento:</strong> ${precioConDescuento.toFixed(2)}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      
      <button onClick={() => onEditar(producto)}>Editar</button>
      <button onClick={() => onEliminar(producto.id)}>Eliminar</button>
    </li>
  );
}

export default ProductItem;
