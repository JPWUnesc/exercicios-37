
const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const file_path = "jogadores.json";

app.post("/jogador", (req, res) => {   
   var fp = fs.readFileSync(file_path, "utf8");
   var jogadores = JSON.parse(fp);

   if(req.body.clube){
      jogadores.clube.push(req.body.clube);
   }

   if(req.body.nome){
      jogadores.clube.push(req.body.nome);
   }

   if(req.body.sobrenome){
      jogadores.clube.push(req.body.sobrenome);
   }

   if(req.body.posicao){
      jogadores.clube.push(req.body.posicao);
   }

   fp = fs.writeFileSync(file_path, JSON.stringify(jogadores))
   res.send('Ok');
});

app.get("/gerador", (req, res) => {
   var nomes = []
   var fp = fs.readFileSync(file_path, "utf8");
   
   var jogadores = JSON.parse(fp);

   var maxIdade = 40;
   var minIdade = 17;

   switch (req.query.idade){
      case 'novato':
         maxIdade = 22;
         break;
      case 'profissional':
         minIdade = 23;
         maxIdade = 28;
         break;
      case 'veterano':
         minIdade = 29;
         maxIdade = 34;
         break;
      case 'master':
         minIdade = 35;
         break;
   }

   const nome = jogadores.nome[Math.floor(Math.random() * jogadores.nome.length)];
   const sobrenome = jogadores.sobrenome[Math.floor(Math.random() * jogadores.sobrenome.length)];
   const idade = Math.floor(Math.random() * (maxIdade - minIdade) + minIdade);
   const posicao = jogadores.posicao[Math.floor(Math.random() * jogadores.posicao.length)];
   const clube = jogadores.clube[Math.floor(Math.random() * jogadores.clube.length)];

   res.send({content: nome + " " + sobrenome + " é um futebolista brasileiro de " + idade + " anos que atua como " + posicao + ". Atualmente defende o " + clube + "."});

});

app.listen(3000);