# 📦 shared-api-client

Este paquete contiene servicios reutilizables que se pueden consumir desde otros proyectos como React, React Native, etc.

---

## 🛠️ Pasos para crear, preparar y publicar un paquete en NPM

### 1. Crear carpeta e inicializar el proyecto


mkdir shared-api-client
cd shared-api-client
npm init -y


## configuarr typescript

npm install typescript --save-dev
npx tsc --init

# Archivo ts config

{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}

## Crear la estrucutra de carpetas

mkdir src
touch src/api.ts
touch index.ts


## api.ts

export const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};


#index.ts

export * from './src/api';


#package.json

{
  "name": "shared-api-client",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}


#compilar 

npm run build


# iniciar sesion con npm 

npm login

# publicar paquete publico ⚠️ Importante: --access=public es obligatorio si usas scopes como @empresa/paquete.

npm publish --access=public



9. Instalar el paquete desde otro proyecto


npm install shared-api-client

# así se utiliza

import { getPosts } from 'shared-api-client';

getPosts().then(posts => console.log(posts));


# actualizar versión 

npm version patch   # 1.0.1
npm version minor   # 1.1.0
npm version major   # 2.0.0

#Volver a compilar y publicar

npm run build
npm publish --access=public


# recomendación usar  un scope para evitar conflictos

{
  "name": "@tuequipo/shared-api-client",
  "version": "1.0.0"
}


###### 1. Agrega "private": true o publica con un scope
##Los paquetes privados normalmente se publican con un scope (nombre de usuario o empresa).
##Ejemplo de package.json:

{
  "name": "@tuequipo/shared-api-client",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "license": "MIT"
}

# publicar 

npm publish --access=restricted


📄 Alternativa: Usar .npmrc local

@tuequipo:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=TU_TOKEN_AQUI


## publicar con versión del readme

 npm version patch
npm publish --access=public