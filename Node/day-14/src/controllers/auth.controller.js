export async function registerUser(req,res,next){
    try{
        throw new Error("New user");
    }catch(err){
        err.status = 409;
        next(err);
    }
}
