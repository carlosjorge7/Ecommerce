const productosCtrl = {}

const mysqlConn = require('../database');

productosCtrl.createProducto = async (req, res) => {
    try {
        await mysqlConn.query('INSERT INTO productos SET ?', [req.body], (err) => {
            if (!err) {
                res.status(200).json({message: 'Producto guardado'});
            } else {
                res.status(401).json({ message: err })
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

productosCtrl.getProductos = async (req, res) => {
  try {
    await mysqlConn.query('SELECT * FROM productos', (err, rows) => {
      if (!err) {
        res.status(200).json(rows);
      }
      else {
        res.status(401).json({ message: 'Producto not found' })
      }
    });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

productosCtrl.getProducto = async (req, res) => {
    try {
        const { idProducto } = req.params;
        await mysqlConn.query('SELECT * FROM productos WHERE idProducto = ?', [idProducto], (err, row) => {
          if (!err) {
            res.status(200).json(row[0]);
          }
          else {
            res.status(401).json({ message: 'Producto not found' })
          }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
// hola 
productosCtrl.updateProducto = async (req, res) => {
    try {
      let { sku, nombre, descripcion, precio, stock, imagen, idCategoria } = req.body;
      const { idProducto } = req.params;
      await mysqlConn.query('UPDATE productos SET sku = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, idCategoria = ? WHERE idProducto = ?', [sku, nombre ,descripcion, precio,, stock, imagen, idCategoria , idProducto], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Producto actualizado' })
        }
        else {
          res.status(401).json({ message: 'Error al actualizar' })
        }
      });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

productosCtrl.deleteProducto = async (req, res) => {
    try {
      const { idProducto } = req.params;
      await mysqlConn.query('DELETE FROM productos WHERE idProducto = ?', [idProducto], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Producto borrado' });
        }
        else {
          res.status(401).json({ message: 'Error al borrar Producto' })
        }
      });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = productosCtrl;