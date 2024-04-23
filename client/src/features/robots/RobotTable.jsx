import React from "react";
import Robot from "./Robot"; 
import { useGetRobotsQuery } from "./robotSlice"; 
import "./robotTable.css"; 

/**
 * RobotTable displays a list of robots
 */
function RobotTable() {
  const { data: robots, error, isLoading } = useGetRobotsQuery(); // Fetch robots data using useGetRobotsQuery

  return (
    <section>
      <h2>Robots</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {robots &&
            robots.map((robot) => <Robot key={robot.id} robot={robot} />)}
        </tbody>
      </table>
    </section>
  );
}

export default RobotTable;
