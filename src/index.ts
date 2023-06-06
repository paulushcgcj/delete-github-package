import { getEnvironmentConfig, setError } from './config';
import { getProjectPackages, deletePackage } from './request';
import type { EnvironmentConfig, PackageInfo } from './dtos';

const config: EnvironmentConfig = getEnvironmentConfig();

getProjectPackages(config)
	.then((packageInfos: PackageInfo[]) => {
		if (packageInfos.length > 0) {
			console.log(
				`Found ${packageInfos.length} package(s)`,
				packageInfos.map((pkg: PackageInfo) => {
					return { id: pkg.id, version: pkg.name };
				})
			);

			return packageInfos.filter(
				(packageInfo: PackageInfo) => packageInfo.name === config.version
			);
		} else {
			console.log('No packages found matching parameters');
			return [];
		}
	})
	.then((packageInfos: PackageInfo[]) => {
		const deletePromises: Promise<void>[] = packageInfos.map(
			(packageInfo: PackageInfo) => deletePackage(config, packageInfo)
		);
		return Promise.all(deletePromises);
	})
	.then(() => console.log('Removed all required packages'))
	.catch((reason: string) => setError(reason));
