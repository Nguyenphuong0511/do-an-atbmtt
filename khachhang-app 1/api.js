const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Thư mục chứa file HTML

// API thêm khách hàng (có thêm mật khẩu)
app.post('/customers', (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email và password là bắt buộc' });
    }
    const sql = 'INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Customer added', customerId: result.insertId });
    });
});

// API lấy danh sách khách hàng
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// Khởi động server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});