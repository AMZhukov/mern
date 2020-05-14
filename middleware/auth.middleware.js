const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') { // это спец. метод в REST API проверяет доступность сервера
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        const decoder = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoder;
        next();

    } catch (e) {
        return res.status(401).json({ message: 'Нет авторизации' })
    }
}