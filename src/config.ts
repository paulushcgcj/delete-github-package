import * as dotenv from 'dotenv';
import * as core from '@actions/core';
import { type EnvironmentConfig } from './dtos';

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
		this.name = process.env.PACKAGENAME || '';
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
		if (!checkTypes(this.type)) {
			throw new Error(
				`${this.type} type is invalid, need to be one of ${validValues}`
			);
		}
	}
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
	if (process.env.NODE_ENV === 'development') {
		return new ActionsEnvironment();
	}
	return new LocalEnvironment();
};

export const setError = (errorMessage: string): void => {
	console.log(errorMessage);
	if (process.env.NODE_ENV !== 'development') {
		core.setFailed(errorMessage);
	}
};

const validValues = ['container', 'maven', 'npm', 'nuget', 'rubygems'];

const checkTypes = (value: string): boolean =>
	validValues.indexOf(value) !== -1;
