require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const sequelize = require('./db');      
require('./models/Car');              

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());              
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api', routes);

sequelize.sync({ alter: false })
  .then(() => {
    console.log('✅ DB synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB sync error:', err);
    process.exit(1);
  });
