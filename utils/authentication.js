const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    const { cookies } = req;

    if(cookies.accessToken){
        let user = jwt.verify(cookies.accessToken, process.env.SECRET_KEY) //Decryption
        req.id = user._id;

        if(!req.id){
            return res.status(401).send({messsage: 'Not Authorized!'})
        };

        return next();
    }

    return res.status(401).send({message: 'Not Authorized!'});
}