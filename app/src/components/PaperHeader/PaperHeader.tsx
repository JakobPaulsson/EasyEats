import React from "react";
import { Typography, Box } from "@mui/material";

interface PaperHeaderProps {
  title: string;
}

function PaperHeader({ title }: PaperHeaderProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        m: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 300 }}>
        {title}
      </Typography>
    </Box>
  );
}

export default PaperHeader;
