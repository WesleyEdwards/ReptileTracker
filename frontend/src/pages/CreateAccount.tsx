import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnAuthContext } from "../context/UnAuthContext";
import { LoadingButton } from "@mui/lab";

export const CreateAccount: FC = () => {
  const { setUser, api } = useContext(UnAuthContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setError(undefined);
    if (!(email && password && firstName && lastName)) {
      setError("Please enter all fields");
      return;
    }
    if (email.indexOf("@") === -1) {
      setError("Please enter a valid email");
      return;
    }

    setSubmitting(true);
    api.auth
      .createAccount({
        email,
        password,
        firstName,
        lastName,
        _id: crypto.randomUUID(),
        admin: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then((user) => {
        if (!user) {
          setError("Invalid email or password");
          return;
        }
        setUser(user);
        setSubmitting(false);
      })
      .catch((e) => {
        setError("Error creating account");
        setSubmitting(false);
      });
  };

  const switchToLogin = () => navigate("/sign-in");

  const makeTextFieldProps = (
    value: string,
    setValue: (newValue: string) => void,
    label: string
  ) => ({
    label: label,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  });

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Card>
          <CardContent>
            <Stack gap="2rem" paddingX="1rem">
              <Stack direction="row">
                <IconButton onClick={switchToLogin}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  variant="h4"
                  textAlign="center"
                  width="100%"
                  sx={{ mr: "2rem" }}
                >
                  Create Your Account
                </Typography>
              </Stack>
              <Stack direction="row" gap="2rem">
                <TextField
                  {...makeTextFieldProps(firstName, setFirstName, "First Name")}
                  fullWidth
                  placeholder="First Name"
                />
                <TextField
                  {...makeTextFieldProps(lastName, setLastName, "Last Name")}
                  fullWidth
                  placeholder="Last Name"
                />
              </Stack>
              <TextField
                {...makeTextFieldProps(email, setEmail, "Email")}
                placeholder="Email"
              />
              <TextField
                {...makeTextFieldProps(password, setPassword, "Password")}
                placeholder="Password"
                type="password"
              />
              {error && <Alert severity="error">{error}</Alert>}

              <LoadingButton
                variant="contained"
                size="large"
                loading={submitting}
                sx={{ width: "12rem", alignSelf: "center", my: "1rem" }}
                type="submit"
              >
                Submit
              </LoadingButton>

              <Stack direction="row" gap="1rem" justifyContent="center">
                <Divider orientation="vertical" flexItem />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
};

export default CreateAccount;
