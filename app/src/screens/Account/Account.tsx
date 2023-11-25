import React from "react";
import "./Account.css";
import CustomPreset from "../../components/CustomPreset/CustomPreset";
import { PresetSelector } from "../../components/PresetSelector/PresetSelector";
import Box from "@mui/material/Box";

function Account() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mr: "180px",
        }}
      >
        <PresetSelector />
      </Box>
      <CustomPreset />;
    </Box>
  );
}

export default Account;
