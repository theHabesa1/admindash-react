import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  table: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    overflowX: "auto",
    marginTop: theme.spacing(2),
  },
}));

const NewTask = () => {
  // state for form
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  // state for tasks
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !startDate || !endDate) {
      setError("All fields are required");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, startDate, endDate, completed: false }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      setError(error.message);
    }
};

return (
<>
    <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h5">New Task</Typography>
            {error && <Typography color="error">{error}</Typography>}
        <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={classes.textField}
            fullWidth
            />
        <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className={classes.textField}
            fullWidth
            />
        <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className={classes.textField}
            fullWidth
            />
        <Button type="submit" variant="contained" color="primary" className={classes.submit}>
        Add Task
        </Button>
</form>
    <Paper className={classes.paper}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Completed</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
        {tasks.map((task) => (
            <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.endDate}</TableCell>
                <TableCell>{task.completed ? 'True' : 'False'}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
    </Paper>
</>
);
};

export default NewTask;    