import type { EnvironmentConfig, PackageInfo } from './dtos';
export declare const getProjectPackages: (configuration: EnvironmentConfig) => Promise<PackageInfo[]>;
export declare const deletePackage: (configuration: EnvironmentConfig, packageInfo: PackageInfo) => Promise<void>;
export declare const deleteProject: (configuration: EnvironmentConfig) => Promise<void>;
