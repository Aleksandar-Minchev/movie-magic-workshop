import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    //Get token
    const token = req.cookies['auth'];

    if(!token){
        return next();        
    }

    //Validate token
    try{
        const decodedToken = jwt.verify(token, SECRET)
        //Attach decoded token to the request
        req.user = decodedToken;
        //Attach ctx to express and forward it to handlebars
        res.locals.user = decodedToken;
       
        next();
    } catch (err){
        res.clearCookie('auth');
        res.redirect('auth/login')
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user){
        return res.redirect('/auth/login');
    }

    next();
}