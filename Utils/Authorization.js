const jwt=require('jsonwebtoken');


function isAuthorized(req,res,next)
{
    const token=req.header('auth-token');
    if(!token)
        return res.status(403).send("Access Denied")
    else
    {
        try {
                const secret=Buffer.from(process.env.JWT_SECRET).toString('base64');
                const verifiedUser=jwt.verify(token,secret)
                req.user=verifiedUser
                next();
        } catch (error) {
             return res.status(403).send("Invalid Access Token")
        }
       
    }

}

module.exports.isAuthorized= isAuthorized