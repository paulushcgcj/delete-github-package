import axios, { type AxiosResponse } from 'axios';
import type { EnvironmentConfig, PackageInfo } from './dtos';

export const getProjectPackages = async (
	configuration: EnvironmentConfig
): Promise<PackageInfo[]> => {
	const url = `https://api.github.com/orgs/${configuration.org}/packages/${configuration.type}/${configuration.name}/versions`;

	try {
		const response: AxiosResponse<PackageInfo[]> = await axios({
			method: 'GET',
			url,
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${configuration.token}`,
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				if (error.response.status === 404) {
					return Promise.reject(
						`No packages found for org ${configuration.org} with name ${configuration.name}`
					);
				} else {
					return Promise.reject(
						`Failed to load from org ${configuration.org} with name ${configuration.name}: status ${error.response.status}`
					);
				}
			} else if (error.request) {
				return Promise.reject('No response received from server:');
			} else {
				return Promise.reject(`Error occurred: ${error.message}`);
			}
		} else {
			return Promise.reject(error);
		}
	}
};

export const deletePackage = async (
	configuration: EnvironmentConfig,
	packageInfo: PackageInfo
): Promise<void> => {
	const url = `https://api.github.com/orgs/${configuration.org}/packages/${configuration.type}/${configuration.name}/versions/${packageInfo.id}`;

	try {
		await axios({
			method: 'DELETE',
			url,
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${configuration.token}`,
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});
		return Promise.resolve();
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				if (error.response.status === 400) {
					return deleteProject(configuration);
				} else {
					return Promise.reject(
						`Failed to remove ${packageInfo.name} from org ${configuration.org} with name ${configuration.name}: status ${error.response.status}`
					);
				}
			} else if (error.request) {
				return Promise.reject('No response received from server:');
			} else {
				return Promise.reject(`Error occurred: ${error.message}`);
			}
		} else {
			return Promise.reject(error);
		}
	}
};

export const deleteProject = async (
	configuration: EnvironmentConfig
): Promise<void> => {
	const url = `https://api.github.com/orgs/${configuration.org}/packages/${configuration.type}/${configuration.name}`;

	try {
		await axios({
			method: 'DELETE',
			url,
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${configuration.token}`,
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});
		return Promise.resolve();
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				return Promise.reject(
					`Failed to remove org ${configuration.org} with name ${configuration.name}: status ${error.response.status}`
				);
			} else if (error.request) {
				return Promise.reject('No response received from server:');
			} else {
				return Promise.reject(`Error occurred: ${error.message}`);
			}
		} else {
			return Promise.reject(error);
		}
	}
};
