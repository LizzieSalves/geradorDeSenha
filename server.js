const express = require('express')//express - fremework Js para banco de dados
const bodyParser = require('body-parser')//body-parser: biblioteca | leitura/procesamento de Json e envia para o Front

const app = express()//iniciando o express
const port = 3000// porta do servidor

// middleware para processar o JSON
app.use(bodyParser.json())

// função que gera as senhas
function generatePassword(length, useUppercase, useNumbers, useSpecialChars){
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'; //Caracteres minusculos 
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%&*()_+-{}[];:<>?^~';

    let characterPool = lowercaseChars;

    if(useUppercase) characterPool += uppercaseChars;
    if(useNumbers) characterPool += numbers;
    if(useSpecialChars) characterPool += specialChars;

    if(!characterPool){
        throw new Error('Nenhum caracter foi selecionado!')
    }

    //variavel que guarda a senha aleatoria
    let password = ''

    //loop para criar a combinação de senha aleatoria
    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characterPool.length)
        password += characterPool[randomIndex]
    }

    //retorna a senha
    return password
    
}

// rota para gerar as senhas
app.post('/generate-password',(req, res)=>{

    const {length, useUppercase, useNumbers, useSpecialChars} = req.body

    if(!length || typeof length != 'number' || length <=0){
        return res.status(400).json({error:'O campo length (o tamanho da senha) deve ser um número maior que 0'})
    }

    try{
        const password = generatePassword(length, useUppercase, useNumbers, useSpecialChars)
        res.json({password})
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

// inicializar o servidor
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
  
})