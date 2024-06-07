//register controller
export const register = (req, res, next)=>{
   try {
    res.send("Register api");
   } catch (error) {
    next(error)
   }
}


//login controller
export const login = (req, res, next)=>{
    try {
        res.send("login api");
    } catch (error) {
     next(error)
    }
}


 //logout controller
export const logout = (req, res, next)=>{
    try {
        res.send("logout api");
    } catch (error) {
     next(error)
    }
}

 //resfreshToken controller
export const resfreshToken = (req, res, next)=>{
    try {
        res.send("refresh token api");
    } catch (error) {
     next(error)
    }
}