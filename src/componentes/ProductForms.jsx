import React, { useState, useEffect } from 'react';

const ProductForm = ({ onGuardar, editingProduct }) => {
  const [id, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [descuento, setDescuento] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setId(editingProduct.id);
      setDescripcion(editingProduct.descripcion);
      setPrecioUnitario(editingProduct.precioUnitario);
      setDescuento(editingProduct.descuento);
      setStock(editingProduct.stock);
    }
  }, [editingProduct]);

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
      <label className="form-label">ID</label>
      <input className="form-input"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <label className="form-label">Descripción</label>
      <input className="form-input"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />
      <label className="form-label">Precio Unitario</label>
      <input className="form-input"
        type="number"
        value={precioUnitario}
        onChange={e => setPrecioUnitario(e.target.value)}
      />
      <label className="form-label">Descuento (%)</label>
      <input className="form-input"
        type="number"
        value={descuento}
        onChange={e => setDescuento(e.target.value)}
      />
      <label className="form-label">Stock</label>
      <input className="form-input"
        type="number"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />
      <button type="submit" className="form-button">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;