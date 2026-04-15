const { Client } = require('pg');

async function createDb() {
  const client = new Client({
    user: 'postgres',
    password: process.env.PGPASSWORD || '9898',
    host: 'localhost',
    port: 5432,
    database: 'postgres' // connect to default db first to create the new one
  });

  try {
    await client.connect();
    console.log('Connected to default postgres database...');
    
    // Check if db exists
    const res = await client.query("SELECT datname FROM pg_database WHERE datname = 'ilkosame'");
    if (res.rowCount === 0) {
      console.log('Creating database ilkosame...');
      await client.query('CREATE DATABASE ilkosame');
      console.log('Database created successfully.');
    } else {
      console.log('Database ilkosame already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDb();
