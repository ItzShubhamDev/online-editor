import mysql from "mysql2/promise";

const globalForMysql = global as unknown as { mysql: mysql.Connection };

const getConnection = async () => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
        throw new Error("Missing database environment variables");
    }
    if (process.env.NODE_ENV === "production") {
        const conn = await mysql.createConnection({
            host: DB_HOST,
            port: parseInt(DB_PORT),
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        });
        return conn;
    } else {
        if (!globalForMysql.mysql) {
            globalForMysql.mysql = await mysql.createConnection({
                host: DB_HOST,
                port: parseInt(DB_PORT),
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
            });
        }
        await globalForMysql.mysql.query(
            "CREATE TABLE IF NOT EXISTS codes (id VARCHAR(36) PRIMARY KEY, code TEXT, mime TEXT, readOnly BOOLEAN)"
        );
        return globalForMysql.mysql;
    }
};

export const connection = getConnection();
