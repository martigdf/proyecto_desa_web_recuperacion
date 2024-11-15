export interface ServerConfig {
    logger: boolean;
    port: number;
    host: string;
}

export const SERVER_CONFIG: ServerConfig = {
    logger: true,
    port: 4000,
    host: '0.0.0.0'
};