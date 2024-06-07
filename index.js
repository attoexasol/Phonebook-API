const { configDotenv } = require("dotenv");
const app = require("./src/app");
configDotenv();


const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})