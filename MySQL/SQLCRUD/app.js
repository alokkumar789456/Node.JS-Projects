const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Error syncing database:', err));

app.listen(3000, () => console.log('Server running on port 3000'));
