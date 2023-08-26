import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const FileNotAllowed = ({ header, text }) => {
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 500,
        padding: 4,
        margin: "auto",
        textAlign: "center",
        border: "2px solid red",
        borderColor: "red",
        "@media (min-width: 600px)": {
          padding: 6,
        },
      }}
    >
      <CardHeader
        sx={{ textAlign: "center", paddingBottom: 0 }}
        title={<Typography variant="h4">{header}</Typography>}
      />
      <CardContent>
        <ErrorIcon sx={{ color: "red", fontSize: 64, marginBottom: 2 }} />
        <Typography variant="h6">{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default FileNotAllowed;
