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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAssessmentDiarist = void 0;
const message = __importStar(require("../../../modulo/config"));
const registerAssessmentDiaristById_1 = require("../../../model/diaristaDAO/registerAssessmentDiaristById");
const jwt = __importStar(require("jsonwebtoken"));
const registerAssessmentDiarist = async function (token, data) {
    const SECRETE = message.REQUIRE_SECRETE;
    try {
        const decoded = jwt.verify(token, SECRETE);
        const { id, name } = decoded;
        const tokenDecoded = { id, name };
        const statusAssessementClient = await (0, registerAssessmentDiaristById_1.dbRegisterAssessmentDiarist)(tokenDecoded, data);
        if (statusAssessementClient === 404) {
            return {
                status: 404,
                message: "Erro verifique se o cliente ou diarista existe e tente novamente. Obs: Não é permitido cadastrar duas vezes a mesma avaliação."
            };
        }
        else if (statusAssessementClient) {
            return {
                status: 201,
                message: message.CREATED_REGISTER
            };
        }
        else {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.registerAssessmentDiarist = registerAssessmentDiarist;
