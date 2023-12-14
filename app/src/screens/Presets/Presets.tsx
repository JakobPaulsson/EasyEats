import React, { useContext } from "react";
import "./Presets.css";
import CustomPreset from "../../components/CustomPreset/CustomPreset";
import { PresetSelector } from "../../components/PresetSelector/PresetSelector";
import Box from "@mui/material/Box";
import { getPresets, removePreset } from "../../services/PresetService";
import { UserContext } from "../../contexts/UserContext";

interface Preset {
  Name: string;
  Icon: string;
  Color: string;
}

function Presets() {
  const [presets, setPresets] = React.useState<any>();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("Authcontext in Presets");
  }

  const { currentUser } = userContext;

  const deletePreset = (preset: Preset) => {
    if (!currentUser) return;
    removePreset(currentUser?.UserID, preset.Name).then(() => {
      getPresets(currentUser?.UserID).then((data) => {
        if (data) {
          setPresets(data.data.query);
        }
      });
    });
  };

  React.useEffect(() => {
    if (!currentUser) return;
    getPresets(currentUser.UserID).then((data) => {
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
