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
exports.setError = exports.getEnvironmentConfig = void 0;
const dotenv = __importStar(require("dotenv"));
const core = __importStar(require("@actions/core"));
class LocalEnvironment {
    constructor() {
        dotenv.config();
        this.token = process.env.TOKEN || '';
        this.org = process.env.ORG || '';
        this.name = process.env.PACKAGENAME || '';
        this.version = process.env.VERSION || '';
        this.type = process.env.TYPE || '';
    }
}
class ActionsEnvironment {
    constructor() {
        this.token = core.getInput('token', { required: true });
        this.org = core.getInput('org', { required: true });
        this.name = core.getInput('name', { required: true });
        this.version = core.getInput('version', { required: true });
        this.type = core.getInput('type', { required: true });
        if (!checkTypes(this.type)) {
            throw new Error(`${this.type} type is invalid, need to be one of ${validValues}`);
        }
    }
}
const getEnvironmentConfig = () => {
    if (process.env.NODE_ENV === 'development') {
        return new ActionsEnvironment();
    }
    return new LocalEnvironment();
};
exports.getEnvironmentConfig = getEnvironmentConfig;
const setError = (errorMessage) => {
    console.log(errorMessage);
    if (process.env.NODE_ENV !== 'development') {
        core.setFailed(errorMessage);
    }
};
exports.setError = setError;
const validValues = ['container', 'maven', 'npm', 'nuget', 'rubygems'];
const checkTypes = (value) => validValues.indexOf(value) !== -1;
//# sourceMappingURL=config.js.map