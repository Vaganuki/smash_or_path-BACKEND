import sequelize from "./config/database";

console.log("App is running...")

async function testConnection() {
    try {
        console.log("Testing DB connection...");
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();