import { useState } from "react";
import {
  useDeleteRobotMutation,
  useUpdateRobotMutation,
} from "./robotSlice";

/**
 * Displays robot information and allows users to either
 * update or delete the robot.
 */
function Robot({ robot }) {
  const [deleteRobot] = useDeleteRobotMutation();
  const [updateRobot] = useUpdateRobotMutation();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(robot.name);
  const [color, setColor] = useState(robot.color);

  function onEdit(event) {
    event.preventDefault();
    if (editing) {
      updateRobot({ id: robot.id, name, color });
    }
    setEditing(!editing);
  }

  const editFields = (
    <>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </td>
    </>
  );

  return (
    <tr>
      {editing ? (
        editFields
      ) : (
        <>
          <td>{name}</td>
          <td>{color}</td>
        </>
      )}
      <td>
        <button onClick={onEdit}>{editing ? "Save" : "Edit"}</button>
        <button onClick={() => deleteRobot(robot.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Robot;
