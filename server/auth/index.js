const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Register a new user account
router.post("/register", async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    // Create a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing user account
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    if (!user) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
