import express from 'express';
import cors from 'cors';
import db from './db.js';
import usersRoutes from './src/routes/users.routes.js';
import productsRoutes from './src/routes/products.routes.js';
import marketRoutes from './src/routes/supermarkets.routes.js'
import categoryRoutes from './src/routes/categories.routes.js'
import dotenv from 'dotenv';
import './src/middlewares/associations.js'


dotenv.config();

const app = express();
const port = 3030;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.use(usersRoutes);
app.use(productsRoutes);
app.use(marketRoutes);
app.use(categoryRoutes)
app.get('/test', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Sincronización de la base de datos y inicio del servidor
db.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch(error => console.error('Error al sincronizar la base de datos:', error));



