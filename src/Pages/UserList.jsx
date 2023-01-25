import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";

const UserList = () => {
  // state for users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Birthdate </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.sex}</TableCell>
              <TableCell>{user.birthdate}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default UserList;
