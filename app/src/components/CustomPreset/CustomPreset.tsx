import React from "react";
import "./CustomPreset.css";
import PresetIcon from "../../components/PresetIcon/PresetIcon";

import { Container, TextField, Slider, Typography, Paper } from "@mui/material";
import PaperHeader from "../../components/PaperHeader/PaperHeader";

interface SliderComponentProps {
  label: string;
}

function SliderComponent({ label }: SliderComponentProps) {
  return (
    <Container>
      <Typography>{label}</Typography>
      <Slider step={0.1} min={0} max={1} marks valueLabelDisplay="auto" />
    </Container>
  );
}

function CustomPreset() {
  return (
    <div className="outerContainer">
      <Paper
        elevation={6}
        sx={{
          width: 650,
          height: 800,
          mt: "60px",
          borderRadius: "10px",
        }}
      >
        <PaperHeader title="Create Custom Preset" />
        <div className="customPresetContainer">
          <PresetIcon />
          <TextField
            sx={{ width: "80%", borderRadius: "50px" }}
            id="outlined-basic"
            label="Preset Name..."
            variant="filled"
          />
          <div className="sliderGridContainer">
            <SliderComponent label={"Previously Used Ingredients"} />
            <SliderComponent label={"Something New"} />
            <SliderComponent label={"Short Cook Time"} />
            <SliderComponent label={"Rating"} />
            <SliderComponent label={"Few Ingredients"} />
            <SliderComponent label={"Ingredients in Inventory"} />
          </div>
          <div className="buttonContainer">
            <button className="button">Add Preset</button>
            <button className="button">Cancel</button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default CustomPreset;
