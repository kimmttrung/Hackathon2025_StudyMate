const app = require("./config/app");
require("dotenv").config();

const port = process.env.PORT || 5001; //check file .env worked or not worked
app.listen(port, () => {
  console.log(`Server đang chạy cổng ${port}`);
});
