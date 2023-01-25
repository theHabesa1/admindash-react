import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import SideNav from "./SideNav";

const AddUser = () => {
  // state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    sex: "",
    password: "",
    confirmPassword: "",
  });

  // state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      setFormData({
        name: "",
        email: "",
        birthdate: "",
        sex: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
          <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required />
          <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required />
          <TextField
              label="Birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              required />
          <FormControl fullWidth margin="normal">
              <InputLabel>Sex</InputLabel>
              <Select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
              >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
              </Select>
          </FormControl>
          <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                          >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                      </InputAdornment>
                  ),
              }}
              required />
          <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                          >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                      </InputAdornment>
                  ),
              }}
              required />
          <Button type="submit" variant="contained" color="primary">
              Add User
          </Button>
      </form></>
);
};

export default AddUser;
