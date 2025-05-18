import React, { useState } from 'react';

function ProductForm({ onGuardar }) {

  const [id, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [descuento, setDescuento] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !descripcion || !precioUnitario || !descuento || !stock) {
      alert('Completa todos los campos');
      return;
    }

    const nuevoProducto = {
      id,
      descripcion,
      precioUnitario: parseFloat(precioUnitario),
      descuento: parseFloat(descuento),
      stock: parseInt(stock, 10),
    };

    onGuardar(nuevoProducto);

    setId('');
    setDescripcion('');
    setPrecioUnitario('');
    setDescuento('');
    setStock('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio Unitario"
        value={precioUnitario}
        onChange={e => setPrecioUnitario(e.target.value)}
      />
      <input
        type="number"
        placeholder="Descuento (%)"
        value={descuento}
        onChange={e => setDescuento(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;