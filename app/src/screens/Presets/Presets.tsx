import React from "react";
import "./Presets.css";
import CustomPreset from "../../components/CustomPreset/CustomPreset";
import { PresetSelector } from "../../components/PresetSelector/PresetSelector";
import Box from "@mui/material/Box";
import { getPresets } from "../../services/PresetService";

function Presets() {
  const [presets, setPresets] = React.useState<any>();

  React.useEffect(() => {
    getPresets(1).then((data) => {
      if (data) {
        setPresets(data.data.query);
      }
      console.log(presets);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 5,
      }}
    >
      <CustomPreset setPresets={setPresets} />
      <PresetSelector presets={presets} />
    </Box>
  );
}

export default Presets;
