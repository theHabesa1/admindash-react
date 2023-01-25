import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TaskList = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Replace this with a call to your API or JSON file
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  /*const handleCheckbox = (taskId) => {
    // Replace this with a call to your API to update the task's status
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };*/

  const handleCheckbox = async (taskId) => {
    // Find the task that needs to be updated
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    // Toggle the completed property
    taskToUpdate.completed = !taskToUpdate.completed;
  
    // Send a PATCH request to the JSON Server to update the task
    await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskToUpdate),
    });
    // Update the state to reflect the changes
    setTasks([...tasks]);
  };
  

  const handleDelete = async (taskId) => {
    // Send a DELETE request to the JSON Server to delete the task
    await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    });
  
    // Remove the task from the state
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="task list">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell component="th" scope="row">
                {task.name}
              </TableCell>
              <TableCell align="right">{task.startDate}</TableCell>
              <TableCell align="right">{task.endDate}</TableCell>
            <TableCell align="right">
            <Checkbox
                 checked={task.completed}
                onChange={() => handleCheckbox(task.id)}
                />
            </TableCell>
        <TableCell align="right">
                <IconButton onClick={() => handleDelete(task.id)}>
                <DeleteIcon />
                </IconButton>
        </TableCell>
    </TableRow>
        ))}
 </TableBody>
</Table>
</TableContainer>
);
};

export default TaskList;
