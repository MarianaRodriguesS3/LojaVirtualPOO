const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const db = require('./database/connection');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.query('SELECT NOW()');
    console.log('✅ Banco conectado');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Falha ao conectar no banco:', err);
  }
})();



// const app = require('./app');
// const db = require('./database/connection');

// (async () => {
//   try {
//     await db.query('SELECT 1');
//     console.log('✅ Banco conectado');
//     app.listen(5000, () => {
//       console.log('🚀 Servidor rodando em http://localhost:5000');
//     });
//   } catch (err) {
//     console.error('❌ Falha ao conectar no banco:', err.message);
//   }
// })();
