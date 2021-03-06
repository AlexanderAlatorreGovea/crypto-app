import { Button, TextField, Link as MuiLink } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../apis/auth.api";
import { User } from "../../models/User";

import { z } from "zod";
import { useAppDispatch } from "../../app/hooks";
import { setAuthState } from "../../slice/auth.slice";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(20).trim(),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailErrored, setEmailErrored] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrored, setPasswordErrored] = useState(false);

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) setEmailErrored(true);
    if (email) setEmailErrored(false);

    if (!password) setPasswordErrored(true);
    if (password) setPasswordErrored(false);

    try {
      const user = { email, password };
      const validatedUser = validationSchema.parse(user);
      const response = (await login(validatedUser)) as { data: User };

      dispatch(setAuthState({ user: response.data }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const emailError = emailErrored && "Please enter a valid Email.";
  const passwordError = passwordErrored && "Password may not be empty.";

  return (
    <div className="flex justify-center items-center flex-col h-screen gap-8">
      <h1 className="text-6xl">Cryptostats</h1>
      <div className="flex flex-col gap-2">
        <TextField
          className="w-80"
          error={emailErrored}
          helperText={emailError}
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <TextField
          className="w-80"
          error={passwordErrored}
          helperText={passwordError}
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
        <Link to="/signup" className="justify-self-start self-start mt-2">
          <MuiLink>Sign Up</MuiLink>
        </Link>
      </div>
      <Button variant="contained" className="w-80" onClick={handleLogin}>
        <span className="p-1">Login</span>
      </Button>
    </div>
  );
};

export default Login;
