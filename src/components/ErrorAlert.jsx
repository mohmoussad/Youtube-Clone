import React from "react";
import { Alert, AlertTitle } from "@mui/material";

function ErrorAlert({ error }) {
  return (
    <Alert
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px" }}
      severity='error'
    >
      <AlertTitle>Error {error?.response?.status || ""}</AlertTitle>
      {error?.message}
    </Alert>
  );
}

export default ErrorAlert;
