import { Container } from "@mui/material";
import { FC } from "react";
import { HeaderTitle } from "../components/HeaderTitle";
import ReptileList from "../components/reptile/ReptileList";
export const DashboardPage: FC = () => {
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Dashboard" />
      <ReptileList />
    </Container>
  );
};
