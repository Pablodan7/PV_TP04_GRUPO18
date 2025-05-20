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
      precioUnitario: Math.max(0, parseFloat(precioUnitario)),
      descuento: Math.min(100, Math.max(0, parseFloat(descuento))),
      stock: Math.max(0, parseInt(stock, 10)),
    };

    onGuardar(nuevoProducto);

    
    if (!editingProduct) // Limpio el formulario solo si no se esta editando
    {
      setId('');
    }
    setDescripcion('');
    setPrecioUnitario('');
    setDescuento('');
    setStock('');
  };

  let boton_texto = 'Agregar Producto'; //variable para controlar el texto que tiene el boton ya sea agrgar o guardar
  if (editingProduct) {
    boton_texto = 'Guardar cambios';  // cambia si editingProduct cambia el valor
  }

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
        onChange={e => setPrecioUnitario(Math.max(0, e.target.value))}
      />
      <label className="form-label">Descuento (%)</label>
      <input className="form-input"
        type="number"
        value={descuento}
        onChange={e => setDescuento(Math.min(100, Math.max(0, e.target.value)))}
      />
      <label className="form-label">Stock</label>
      <input className="form-input"
        type="number"
        value={stock}
        onChange={e => setStock(Math.max(0, e.target.value))}
      />
      <button type="submit" className="form-button"> {boton_texto}</button> {/* variable para el tecto del boton*/}

    </form>
  );
}

export default ProductForm;