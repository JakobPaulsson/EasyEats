import React from "react";
import { Typography, Box, Divider } from "@mui/material";

interface PaperHeaderProps {
  title: string;
}

function PaperHeader({ title }: PaperHeaderProps) {
  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          m: 1.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: "rgba(0, 0, 0, 0.54)" }}
        >
          {title}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}

export default PaperHeader;
