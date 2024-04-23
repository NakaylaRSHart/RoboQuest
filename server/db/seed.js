const { PrismaClient } = require('@prisma/client');
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function seed() {
  try {
    // Clearing data
    await prisma.robot.deleteMany();
    await prisma.user.deleteMany();

    // Create 3 users with 3 robots per user
    for (let i = 0; i < 3; i++) {
      // Create user
      const user = await prisma.user.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
        },
      });

      // Create 3 robots for this user
      for (let j = 0; j < 3; j++) {
        await prisma.robot.create({
          data: {
            name: faker.commerce.productName(),
            color: faker.color.human(),
            userId: user.id,
          },
        });
      }
    }

    console.log('Database seeded successfully with users and robots!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}


seed();
