import React from "react";
import "./Presets.css";
import CustomPreset from "../../components/CustomPreset/CustomPreset";
import { PresetSelector } from "../../components/PresetSelector/PresetSelector";
import Box from "@mui/material/Box";
import { getPresets, removePreset } from "../../services/PresetService";

interface Preset {
  Name: string;
  Icon: string;
  Color: string;
}

function Presets() {
  const [presets, setPresets] = React.useState<any>();

  const deletePreset = (preset: Preset) => {
    removePreset(1, preset.Name).then(() => {
      getPresets(1).then((data) => {
        if (data) {
          setPresets(data.data.query);
        }
      });
    });
  };

  React.useEffect(() => {
    getPresets(1).then((data) => {
      if (data) {
        setPresets(data.data.query);
      }
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
      <PresetSelector presets={presets} deletePreset={deletePreset} />
    </Box>
  );
}

export default Presets;
