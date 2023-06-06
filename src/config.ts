import * as dotenv from 'dotenv';
import * as core from '@actions/core';

export interface EnvironmentConfig {
	token: string;
	org: string;
	name: string;
	version: string;
	type: string;
}

class LocalEnvironment implements EnvironmentConfig {
	token: string;
	org: string;
	name: string;
	version: string;
	type: string;

	constructor() {
		dotenv.config();

		this.token = process.env.TOKEN || '';
		this.org = process.env.ORG || '';
		this.name = process.env.NAME || '';
		this.version = process.env.VERSION || '';
		this.type = process.env.TYPE || '';
	}
}

class ActionsEnvironment implements EnvironmentConfig {
	token: string;
	org: string;
	name: string;
	version: string;
	type: string;

	constructor() {
		this.token = core.getInput('token', { required: true });
		this.org = core.getInput('org', { required: true });
		this.name = core.getInput('name', { required: true });
		this.version = core.getInput('version', { required: true });
		this.type = core.getInput('type', { required: true });
	}
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
	if (process.env.NODE_ENV === 'development') {
		return new ActionsEnvironment();
	}
	return new LocalEnvironment();
};
