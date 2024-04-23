const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('express').Router();

// Middleware to require authentication for modifying endpoints
// router.use((req, res, next) => {
//   if (req.method !== 'GET' && !req.user) {
//     return res.status(401).send('You must be logged in to do that.');
//   }
//   next();
// });

// Get all robots (accessible to everyone)
router.get("/", async (req, res, next) => {
  try {
    const robots = await prisma.robot.findMany();
    res.send(robots);
  } catch (error) {
    next(error);
  }
});

// Get a robot by id (accessible to everyone)
router.get("/:id", async (req, res, next) => {
  try {
    const robot = await prisma.robot.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!robot) {
      return res.status(404).send('Robot not found.');
    }

    res.send(robot);
  } catch (error) {
    next(error);
  }
});

// Create a new robot (requires authentication)
router.post("/", async (req, res, next) => {
  try {
    const robot = await prisma.robot.create({
      data: {
        name: req.body.name,
        color: req.body.color,
        userId: req.user.id,
      },
    });
    res.status(201).send(robot);
  } catch (error) {
    next(error);
  }
});

// Update a robot (requires authentication)
router.put("/:id", async (req, res, next) => {
  try {
    const robot = await prisma.robot.update({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
      },
      data: {
        name: req.body.name,
        color: req.body.color,
      },
    });

    if (!robot) {
      return res.status(404).send('Robot not found.');
    }

    res.send(robot);
  } catch (error) {
    next(error);
  }
});

// Delete a robot by id (requires authentication)
router.delete("/:id", async (req, res, next) => {
  try {
    const robot = await prisma.robot.delete({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
      },
    });

    if (!robot) {
      return res.status(404).send('Robot not found.');
    }

    res.send(robot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
