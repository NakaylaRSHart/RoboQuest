# RoboQuest: Mechanical Mastery

User table
  username
  password

Robot table
  name
  color
  userId

create 3 users with 3 robots per user (may use Faker if you’d like)
  Endpoints

authentication - handles username/password credentials
  POST /auth/register - create a new User with the provided credentials and return a token
  POST /auth/login - log in with the provided credentials and return a token

accessed by anyone
  GET /api/v1/robots - get all robots
  GET /api/v1/robots/:id - get the robot specified by id

accessed if a valid token is provided in the request headers and sends back a 401 status if the token is not provided
  POST /api/v1/robots - create a new robot as the currently logged-in user
  PUT /api/v1/robots/:id - update a robot only if it was created by the currently logged-in user
  DELETE /api/v1/robots/:id - delete a robot only if it was create by the currently logged-in user
