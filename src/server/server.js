const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(userRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`server is up on ${port}`);
  });
}

module.exports = app;
