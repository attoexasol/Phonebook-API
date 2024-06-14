const dotenv = require('dotenv');
const app = require("./src/app");
const connectDb = require("./src/helper/db"); // Adjusted import
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`App is running on port ${PORT}`);
    await connectDb(); 
});
