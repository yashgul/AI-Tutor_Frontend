import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import Navbar from "../navbar/Navbar";

import { Button, FormControl, Typography } from "@mui/material";
import {
  TextField,
  Select,
  MenuItem,
  Card,
  InputLabel,
  Box,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/auth/login", {
        email: data.email,
        password: data.pwd1,
        role: data.role,
      })
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem(
          "userdata",
          JSON.stringify({ jwt: response.data.token, id: response.data.id })
        );
        props.toast.success(response.data.message, { theme: "colored" });
        navigate("../products");
      })
      .catch(function (error) {
        console.log(error);
        props.toast.error(error.response.data.error, { theme: "colored" });
      });
  };

  return (
    <>
      {/* <Navbar /> */}
      <Card
        sx={{
          width: { xs: "60vw", md: "30vw" },
          bgcolor: "#1c1f2a",
          margin: "auto",
          mt: 4,
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1, color: "lightgray" }}>
          Login
        </Typography>

        <Typography variant="h6" sx={{ color: "gray" }}>
          You must log in to continue learning
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} sx={{ pt: 3 }}>
            <Grid xs={12}>
              <Controller
                name={"email"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "The email address is invalid",
                  },
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Email Address"}
                    inputRef={ref}
                    error={invalid}
                    color="secondary"
                    variant="filled"
                    helperText={errors.email ? errors.email.message : ""}
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12}>
              <Controller
                name={"pwd1"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Password"}
                    inputRef={ref}
                    error={invalid}
                    type="password"
                    color="secondary"
                    variant="filled"
                    helperText={errors.pwd1 ? errors.pwd1.message : ""}
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ width: { xs: "100%", md: "30%" } }}
              >
                Submit
              </Button>
            </Grid>

            <Grid xs={12}>
              <Typography color="lightgray">
                Havent created an account yet?{" "}
                <NavLink style={{ textDecoration: "none" }} to="../register">
                  Register
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
}

export default Login;
