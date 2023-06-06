"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const request_1 = require("./request");
const config = (0, config_1.getEnvironmentConfig)();
(0, request_1.getProjectPackages)(config)
    .then((packageInfos) => {
    if (packageInfos.length > 0) {
        console.log(`Found ${packageInfos.length} package(s)`, packageInfos.map((pkg) => {
            return { id: pkg.id, version: pkg.name };
        }));
        return packageInfos.filter((packageInfo) => packageInfo.name === config.version);
    }
    else {
        console.log('No packages found matching parameters');
        return [];
    }
})
    .then((packageInfos) => {
    const deletePromises = packageInfos.map((packageInfo) => (0, request_1.deletePackage)(config, packageInfo));
    return Promise.all(deletePromises);
})
    .then(() => console.log('Removed all required packages'))
    .catch((reason) => (0, config_1.setError)(reason));
//# sourceMappingURL=index.js.map