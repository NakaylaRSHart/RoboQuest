const router = require("express").Router();

router.use("/robots", require("./robots"));//EVERYTHING running in api folder needs to have a /students before

module.exports = router;
