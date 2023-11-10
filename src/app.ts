/**
 *  Se for programar em js é recomentado usar o :
 *  npx eslint --init para javascript, ele ajuda a manter o código limpo.
 * 
 *  npm init
 *
 *  npm add express
 *
 *  npm add -D  typescript @types/express ts-node-dev
 *
 *  npm add cors
 * 
 *  npm add -D @types/cors
 *  tsc --init
 *
 * 
 *  Para converte em js: npm i tsup -D 
 *  Configura o package.json
 *  Para inicializar npm run build
 * 
 *  OU somente tsc para transpirar em javascript
 * 
 * 
 * npm install jsonwebtoken
 * npm install @types/jsonwebtoken
 * 
 *  Para rodar node ./dist/app.js
 * 
 * Para mudar o banco local e deixar online: npx prisma migrate dev
 * 
 * git remote add 'URL'
 * Para mandar o commit para o meu repositorio pessoal: git push -u origin main
 * Para mandar o commit para o repositório da organização: git push -u organizacao <branch>
 * 
 * Para saber o repositorio: git remote -v
 * 
 * Extensão para o shema.prisma: Prisma
 * 
 * 
 * *****************************************************************
 *  npx prisma migrate dev -> Para instalar as tabelas no banco
 *  npm run dev -> Para rodar o código com os endpoints
 *  npm run seed -> Para rodar todos os scripts de insert do banco
 * *****************************************************************
 * 
 */
//aaaaa

const express = require('express')

const port = process.env.PORT || 8080

const cors = require('cors')

import { server } from './server/server'

const app = express();

//Configuração do cors
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS'
}

app.use(cors(corsOptions))
  
app.use(server)

app.listen(port, () => console.log('Servidor Aguardando requisições na porta 8080'))