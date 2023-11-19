import * as React from "react";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

interface PresetSliderProps {
  name: string;
  value: number;
}

const PresetSlider: React.FC<PresetSliderProps> = ({
  name,
  value,
}: PresetSliderProps) => {
  return (
    <Box sx={{ width: 180, textAlign: "center" }}>
      <Typography id="discrete-slider-custom" gutterBottom variant="subtitle2">
        {name}
      </Typography>
      <Slider
        aria-label={name}
        defaultValue={value}
        getAriaValueText={(value) => `${value}%`}
        marks={marks}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        color="info"
      />
    </Box>
  );
};

export default PresetSlider;
