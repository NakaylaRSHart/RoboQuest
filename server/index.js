const app = require('./app');
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
