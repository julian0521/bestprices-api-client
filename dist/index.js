"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
__exportStar(require("./src/strapi"), exports);
// import { ApiStrapi } from './src/strapi';
// // Instancia con tu base URL y token
// const api = new ApiStrapi({
//     baseUrl: 'https://strapi-dev-app-62xrmuq3bq-ue.a.run.app/api',
//     token: '74c80edda1c0f2c30f9c04a244e18fc7d9110af1e179c1a50bf5101b09c3c8a58287156d89abea786006b47925cc207c48d1ee22bd9468c9da257d224f4eebad164fc92175bd1992d9854e8c9451d41098b4b8bdc6642aba1bb1d412006f6fede42e0bf0659f9ff9678f2eceb479f5af62d1f81987ab775ba67d13135c7f487c'
// });
// async function main() {
//     try {
//         const result = await api.getProduct();
//         console.log("Resultado:", result);
//     } catch (error) {
//         console.error("Error al obtener productos:", error);
//     }
// }
// main();
