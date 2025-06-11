const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // thay bằng mật khẩu MySQL của bạn
    database: 'customer_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Đã kết nối MySQL');
});

// API thêm khách hàng
app.post('/customers', (req, res) => {
    const { name, email, phone } = req.body;
    const sql = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
    db.query(sql, [name, email, phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, name, email, phone });
    });
});

// API lấy danh sách khách hàng
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});