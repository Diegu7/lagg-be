
const pg = require('pg');
const {Client} = pg;
const app = require('./app');
const port = process.env.PORT || 1234;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'lagg',
  password: 'hola123',
  port: 5432,
})

client.connect((err, res) => {
  if (err) {
    console.log(err.stack);
  }
  else {
    console.log('Conectado a la base de datos exitosamente')

    app.listen(port, function() {
      console.log('Esuchando en puerto ' + port);
    });
  }
});
