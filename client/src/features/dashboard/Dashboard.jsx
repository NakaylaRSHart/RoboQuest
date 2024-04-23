import React from "react";
import LogoutButton from "../auth/LogoutButton";
import { useMeQuery } from "../auth/authSlice";
import RobotTable from "../robots/RobotTable";
import RobotForm from "../robots/RobotForm";

function Dashboard() {
  const { data: me } = useMeQuery();

  return (
    <main>
      {me ? ( // Check if 'me' (user data) exists, meaning user is logged in
        <div>
          <h1>Welcome, {me.username}!</h1>
          <LogoutButton />
          <RobotTable />
          {/* Allow creating new robot only when logged in */}
          {me && <h2>Create New Robot</h2>}
          {me && <RobotForm />}
        </div>
      ) : (
        <div>
          <h1>Welcome! Please log in to access this page.</h1>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
