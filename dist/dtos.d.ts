export interface EnvironmentConfig {
    token: string;
    org: string;
    name: string;
    version: string;
    type: string;
}
export interface PackageInfo {
    id: number;
    name: string;
    url: string;
    package_html_url: string;
    license: string;
    created_at: string;
    updated_at: string;
    description: string;
    html_url: string;
    metadata: {
        package_type: string;
    };
}
