const clientesCtrl = {}

const mysqlConn = require('../database');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

clientesCtrl.registroCliente = async (req, res) => {
  try {
    const cliente = await getEmail(req.body.email);
    if(cliente === undefined) {
      // Registramos un cliente
      req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10)
      await mysqlConn.query('INSERT INTO clientes SET ?', [req.body]);
    
      const nuevo = await getEmail(req.body.email);

      const token = jwt.sign({ id: req.body.idCliente }, 'secret_cliente', {
        expiresIn: 60 * 60 * 24 // 1 dia en segundos
      });
      // IMPORTANTE !! Hay que sacar el idCliente de alguna manera
      res.status(200).json({ auth: false, token: token, message: `Bienvenido ${req.body.nombreCompleto}`, idCliente: nuevo.idCliente});
    } else {
      // Ya existe el cliente
      res.status(401).json({ message: 'El cliente ya existe' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

clientesCtrl.loginCliente = async (req, res) => {
    try {
        const cliente = await getEmail(req.body.email)
        if (cliente === undefined) {
          res.status(401).send('El email del cliente no existe');
        }
        else {
          const match = await bcrypt.compareSync(req.body.contrasena, cliente.contrasena);
          if (!match) {
            res.status(401).send('La contraseña no es correcta');
          }
          else {
            const token = jwt.sign({ id: req.body.idCliente }, 'secret_cliente', {
              expiresIn: 60 * 60 * 24 // 1 dia en segundos
            });
            res.status(200).json({ auth: false, token: token, idCliente: cliente.idCliente, message: `Bienvenido ${cliente.email}`});
          }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// clientesCtrl.getClientes = async (req, res) => {
//   try {
//     await mysqlConn.query('SELECT * FROM Clientes', (err, rows) => {
//       if (!err) {
//         res.status(200).json(rows);
//       }
//       else {
//         res.status(401).json({ message: 'Cliente not found' })
//       }
//     });
//   }
//   catch (error) {
//       res.status(500).json({ message: 'Server error' });
//   }
// }

// clientesCtrl.getCliente = async (req, res) => {
//     try {
//         const { idCliente } = req.params;
//         await mysqlConn.query('SELECT * FROM Clientes WHERE idCliente = ?', [idCliente], (err, row) => {
//           if (!err) {
//             res.status(200).json(row[0]);
//           }
//           else {
//             res.status(401).json({ message: 'Cliente not found' })
//           }
//         });
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// }

// clientesCtrl.updateCliente = async (req, res) => {
//     try {
//       let { sku, nombre, descripcion, precio, stock, imagen, idCategoria } = req.body;
//       const { idCliente } = req.params;
//       await mysqlConn.query('UPDATE Clientes SET sku = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, idCategoria = ? WHERE idCliente = ?', [sku, nombre ,descripcion, precio,, stock, imagen, idCategoria , idCliente], (err) => {
//         if (!err) {
//           res.status(200).json({ message: 'Cliente actualizado' })
//         }
//         else {
//           res.status(401).json({ message: 'Error al actualizar' })
//         }
//       });
//   }
//   catch (error) {
//       res.status(500).json({ message: 'Server error' });
//   }
// }

// clientesCtrl.deleteCliente = async (req, res) => {
//     try {
//       const { idCliente } = req.params;
//       await mysqlConn.query('DELETE FROM Clientes WHERE idCliente = ?', [idCliente], (err) => {
//         if (!err) {
//           res.status(200).json({ message: 'Cliente borrado' });
//         }
//         else {
//           res.status(401).json({ message: 'Error al borrar Cliente' })
//         }
//       });
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// }

// Funciones auxiliares
const getEmail = (email) => {
    return new Promise((resolve, reject) => {
      mysqlConn.query('SELECT * FROM  clientes WHERE email = ?', [email], (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      });
    });
  }

module.exports = clientesCtrl;