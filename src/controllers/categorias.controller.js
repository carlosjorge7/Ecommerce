const categoriasCtrl = {}

const mysqlConn = require('../database');


categoriasCtrl.createCategoria = async (req, res) => {
    try {
      await mysqlConn.query('INSERT INTO categorias SET ?', [req.body], (err) => {
          if (!err) {
              res.status(200).json({message: 'Categoria guardada'});
          } else {
              res.status(401).json({ message: err })
          }
      });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

categoriasCtrl.getCategorias = async (req, res) => {
  try {
    await mysqlConn.query('SELECT * FROM categorias', (err, rows) => {
      if (!err) {
        res.status(200).json(rows);
      }
      else {
        res.status(401).json({ message: 'Categorias not found' })
      }
    });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

categoriasCtrl.getCategoria = async (req, res) => {
    try {
        const { idCategoria } = req.params;
        await mysqlConn.query('SELECT * FROM categorias WHERE idCategoria = ?', [idCategoria], (err, row) => {
          if (!err) {
            res.status(200).json(row[0]);
          }
          else {
            res.status(401).json({ message: 'Categoria not found' });
          }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

categoriasCtrl.updateCategoria = async (req, res) => {
    try {
      let { nombre, descripcion } = req.body;
      const { idCategoria } = req.params;
      await mysqlConn.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE idCategoria = ?', [nombre, descripcion, idCategoria], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Categoria actualizada' })
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

categoriasCtrl.deleteCategoria = async (req, res) => {
    try {
      const { idCategoria } = req.params;
     
      await mysqlConn.query('DELETE FROM categorias WHERE idCategoria = ?', [idCategoria], (err, row) => {
        if (!err) {
          res.status(200).json({ message: 'Categoria borrada' });
        }
        else {
          res.status(401).json({ message: 'Error al borrar categoria' });
        }
      });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = categoriasCtrl;