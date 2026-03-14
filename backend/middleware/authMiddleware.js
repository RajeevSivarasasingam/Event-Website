const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
<<<<<<< HEAD
        // Verify token (Bearer <token>)
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; // Add user payload to request
        next(); // Move to the next function
=======
         
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;  
        next();  
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;