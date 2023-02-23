const checkUserCredentials = require('./auth.controllers')
const response = require("../utils/responses.handler");
const jwt = require ('jsonwebtoken')


const postLogin = (req, res) => {
    const {email, password} = req.body 
    checkUserCredentials(email,password)
        .then(data =>{
            if(data){

                const token =jwt.sign({
                    id: data.id,
                    email:data.email,
                    firstName:data.firstName
                },'academlo',{
                    expiresIn: 30
                })

                response.success({
                    status:200,
                    message:'Correct Crentials!',
                    data:token
                })
            }else{
                response.error({
                    res,
                    status:401,
                    message:'Invalid Credentials'
                })
            }
        })
        .catch(error => {
            response.error({
                res,
                status:400,
                data:error,
                message:'Somenthing bad'
            })
        })
}

module.exports = postLogin