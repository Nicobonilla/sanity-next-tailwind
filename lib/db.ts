import { Sequelize } from 'sequelize-typescript';
import { Order } from '../models/order';
import { User } from '@/models/user';
import { Product } from '@/models/product';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db', // Nombre del servicio en docker-compose
  port: 5432,
  username: 'ecommerce_user',
  password: 'ecommerce_pass',
  database: 'ecommerce_db',
  models: [User, Product, Order], // Registra tus modelos aquí
});

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida con éxito');
    await sequelize.sync({ alter: true }); // Sincroniza modelos con la DB
    console.log('Modelos sincronizados con PostgreSQL');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
  }
}

export default sequelize;