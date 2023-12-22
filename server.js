// server.js
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync Sequelize models to the MySQL database on server start
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true to drop and recreate tables

    console.log('Sequelize models synchronized with the database');
  } catch (error) {
    console.error('Error synchronizing Sequelize models with the database:', error);
  }
};

// Call the syncDatabase function before including routes
syncDatabase();

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
