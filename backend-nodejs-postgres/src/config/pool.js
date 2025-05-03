import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Test query
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database error:', err)
    } else {
        console.log('PostgreSQL connected at:', res.rows[0].now)
    }
})