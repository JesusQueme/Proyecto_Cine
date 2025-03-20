const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.urlencoded({extended:false}));
app.use(express.json());




app.get('/', (req, res)=>{
    res.send('Hola mundo');
})

app.post('/auth', (req,res)=>{
    const {usuario, password} = req.body;
    //Consultar a la bd que existe usuario y password
    const user = {usuario:usuario};

    const accessToken = generateAccessToken(user);
    res.header('authorization', accessToken.json({
        message: 'Usuario autenticado',
        token: accessToken
    }));

});

function generateAccessToken(user){
    return jwt.sign(user,process.env.SECRET, {expiresIn:'5m'} );

}

function validateToken(req, res, next){
    const accessToken = req.header['authorization'] || req.query.accessToken;
    if(!accessToken) res.send('Access denied');
    jwt.verify(accessToken, process.env.SECRET, (err, user)=>{
        if(err){
            res.send('Access denied, token expired or incorrect');
        }else{
            req.user = user;
           next(); 
        }
    })
}


app.listen(3000,()=>{
    console.log('servidor iniciando en el puerto 3000');
});