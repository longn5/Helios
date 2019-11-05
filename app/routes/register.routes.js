module.exports = (app) => {
    const register = require('../controllers/register.controller.js');

    app.post('/register', register.create);

    app.get('/register', register.findAll);

    app.get('/register/:registerId', register.findOne);

    app.put('/register/:registerId', register.update);

    app.delete('/register/:registerId', register.delete);
}