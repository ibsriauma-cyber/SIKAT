import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOSTINGER_HOST,
    user: process.env.HOSTINGER_USER,
    password: process.env.HOSTINGER_PASSWORD,
    database: process.env.HOSTINGER_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export { pool };
