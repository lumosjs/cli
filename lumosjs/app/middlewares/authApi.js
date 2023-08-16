export function auth(req, res, next) {
  const isAuth = req.headers.authorization && req.headers.authorization.includes("Bearer") ? true : false 
  
  if (isAuth) {
    next();
  } else {
    res.json({message:"You`re almost hacked this API ,you is embryo soldier!, token Bearer required"});
  }
}