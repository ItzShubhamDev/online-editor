import mysql from "mysql2/promise";

const globalForMysql = global as unknown as { mysql: mysql.Connection };

const getConnection = async () => {
    if (process.env.NODE_ENV === "production") {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: "editor",
            password: "editor",
            database: "codes",
        });
        return conn;
    } else {
        if (!globalForMysql.mysql) {
            globalForMysql.mysql = await mysql.createConnection({
                host: "localhost",
                user: "editor",
                password: "editor",
                database: "codes",
            });
        }
        await globalForMysql.mysql.query(
            "CREATE TABLE IF NOT EXISTS codes (id VARCHAR(36) PRIMARY KEY, code TEXT)"
        );
        return globalForMysql.mysql;
    }
};

export const connection = getConnection();
