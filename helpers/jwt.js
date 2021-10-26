const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }

        });

    });

}


const comprobarJWT = (token = '') => {

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        return [true, uid];

    } catch (error) {
        return [false, null];
    }

}
module.exports = {
    generarJWT,
    comprobarJWT
}