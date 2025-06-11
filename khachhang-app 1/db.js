const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'tphg',
    password: '1234', // Thay bằng mật khẩu MySQL của bạn
    database: 'customer_db'    // Thay bằng tên database của bạn
});

db.connect((err) => {
    if (err) {
        console.error('Kết nối MySQL thất bại:', err);
        return;
    }
    console.log('Kết nối MySQL thành công!');
});

module.exports = db;