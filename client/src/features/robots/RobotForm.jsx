import { useAddRobotMutation } from "./robotSlice";
/**
 * This form allows an instructor to add a new robot to the database.
 */
function RobotForm() {
  const [addRobot] = useAddRobotMutation();

  async function onSubmit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const color = event.target.color.value;

    if (name && color) {
      await addRobot({ name, color });
      event.target.reset();
    }
  }

  return (
    <section>
      <h2>Add a Robot</h2>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Color
          <input type="text" name="color" />
        </label>
        <button type="submit">Add Robot</button>
      </form>
    </section>
  );
}

export default RobotForm;
