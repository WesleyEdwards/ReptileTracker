import {
  Button,
  Link,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderTitle } from "../components/HeaderTitle";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Typography variant="h1" sx={{ mb: 6 }} textAlign="center">
        Reptile Tracker
      </Typography>
      <Typography variant="h5">What is Reptile Tracker?</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>
        Reptile Tracker is an application that can help you:
      </Typography>

      <Stack padding={2} gap={1}>
        <Typography>- Keep track of your reptiles</Typography>
        <Typography>
          - Create schedules to help you easily care for your reptiles
        </Typography>
        <Typography>- Keep records of your reptiles' health</Typography>
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        paddingTop="4rem"
        gap={4}
      >
        <Button
          variant="contained"
          sx={{ width: "12rem" }}
          onClick={() => navigate("/sign-in")}
        >
          Sign In
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/create-account")}
        >
          Don't have an account?
        </Link>
      </Stack>
    </Container>
  );
};

export default HomePage;
