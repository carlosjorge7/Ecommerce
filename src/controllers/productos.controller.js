const productosCtrl = {}

const mysqlConn = require('../database');

const path = require('path');
const fs = require('fs-extra');

productosCtrl.createProducto = async (req, res) => {
    try {
      const { sku, nombre, descripcion, precio, stock, idCategoria } = req.body;
      const nuevoProducto = { sku, nombre, descripcion, precio, stock, imagen: req.file.path, idCategoria};
      await mysqlConn.query('INSERT INTO productos SET ?', [nuevoProducto], (err) => {
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
    let qry = `SELECT p.idProducto, p.nombre, p.sku, p.descripcion, p.precio, p.imagen, p.stock, p.createdAt, c.nombre as nombreCategoria
              FROM productos p LEFT JOIN categorias c ON p.idCategoria = c.idCategoria
              ORDER BY p.idProducto`;
    await mysqlConn.query(qry, (err, rows) => {
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
        let qry = `SELECT p.idProducto, p.sku, p.nombre, p.descripcion, p.precio, p.imagen, p.stock, p.createdAt, c.nombre as nombreCategoria, c.idCategoria
                  FROM productos p LEFT JOIN categorias c ON p.idCategoria = c.idCategoria
                  WHERE p.idProducto = ?
                  ORDER BY p.idProducto`;
        const { idProducto } = req.params;
        await mysqlConn.query(qry, [idProducto], (err, row) => {
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

productosCtrl.updateProducto = async (req, res) => {
    try {
      let { sku, nombre, descripcion, precio, stock, idCategoria } = req.body;
      const { idProducto } = req.params;
      let qry = 'UPDATE productos SET sku = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, idCategoria = ? WHERE idProducto = ?';
      await mysqlConn.query(qry, [sku, nombre ,descripcion, precio, stock, idCategoria , idProducto], (err) => {
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
      // Deslinkear la imagen asociada
      await mysqlConn.query('SELECT imagen FROM productos WHERE idProducto = ?', [idProducto], (err, row) => {
        if (!err) {
          const imagen = row[0]['imagen'];
          fs.unlink(path.resolve(imagen));
        }
      });

      await mysqlConn.query('DELETE FROM productos WHERE idProducto = ?', [idProducto], (err, row) => {
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