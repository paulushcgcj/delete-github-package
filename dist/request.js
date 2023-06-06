"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.deletePackage = exports.getProjectPackages = void 0;
const axios_1 = __importDefault(require("axios"));
const getProjectPackages = (configuration) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.github.com/orgs/${configuration.org}/packages/${configuration.type}/${configuration.name}/versions`;
    try {
        const response = yield (0, axios_1.default)({
            method: 'GET',
            url,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${configuration.token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    return Promise.reject(`No packages found for org ${configuration.org} with name ${configuration.name}`);
                }
                else {
                    return Promise.reject(`Failed to load from org ${configuration.org} with name ${configuration.name}: status ${error.response.status}`);
                }
            }
            else if (error.request) {
                return Promise.reject('No response received from server:');
            }
            else {
                return Promise.reject(`Error occurred: ${error.message}`);
            }
        }
        else {
            return Promise.reject(error);
        }
    }
});
exports.getProjectPackages = getProjectPackages;
const deletePackage = (configuration, packageInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.github.com/orgs/${configuration.org}/packages/${configuration.type}/${configuration.name}/versions/${packageInfo.id}`;
    try {
        yield (0, axios_1.default)({
            method: 'DELETE',
            url,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${configuration.token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        return Promise.resolve();
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    return (0, exports.deleteProject)(configuration);
                }
                else {
                    return Promise.reject(`Failed to remove ${packageInfo.name} from org ${configuration.org} with name ${configuration.name}: status ${error.response.status}`);
                }
            }
            else if (error.request) {
                return Promise.reject('No response received from server:');
            }
            else {
                return Promise.reject(`Error occurred: ${error.message}`);
            }
        }
        else {
            return Promise.reject(error);
        }
    }
});
exports.deletePackage = deletePackage;
const deleteProject = (configuration) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.github.com/orgs/${configuration.org}/packages/${configuration.type}/${configuration.name}`;
    try {
        yield (0, axios_1.default)({
            method: 'DELETE',
            url,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${configuration.token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        return Promise.resolve();
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                return Promise.reject(`Failed to remove org ${configuration.org} with name ${configuration.name}: status ${error.response.status}`);
            }
            else if (error.request) {
                return Promise.reject('No response received from server:');
            }
            else {
                return Promise.reject(`Error occurred: ${error.message}`);
            }
        }
        else {
            return Promise.reject(error);
        }
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=request.js.map