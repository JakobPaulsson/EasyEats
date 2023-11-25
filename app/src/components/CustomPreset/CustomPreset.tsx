import React from "react";
import "./CustomPreset.css";
import PresetIcon from "../../components/PresetIcon/PresetIcon";
import { addPreset } from "../../services/PresetService";
import { Container, TextField, Slider, Typography, Paper } from "@mui/material";
import PaperHeader from "../../components/PaperHeader/PaperHeader";
import OkDialog from "../../components/OkDialog/OkDialog";

function CustomPreset() {
  const [icon, setIcon] = React.useState("PedalBikeIcon");
  const [color, setColor] = React.useState("#65D663");
  const [open, setOpen] = React.useState<boolean>(false);
  const [popupText, setPopupText] = React.useState<string>("");
  const [popupTitle, setPopupTitle] = React.useState<string>("");
  const [presetName, setPresetName] = React.useState<string>("");
  const [ratingSlider, setRatingSlider] = React.useState<number>(0.0);
  const [cookTimeSlider, setCookTimeSlider] = React.useState<number>(0.0);
  const [ingredientsInInventorySlider, setIngredientsInInventorySlider] =
    React.useState<number>(0.0);
  const [fewIngredientsSlider, setFewIngredientsSlider] =
    React.useState<number>(0.0);

  const addNewPreset = () => {
    addPreset(
      1,
      presetName,
      icon,
      color,
      ratingSlider,
      cookTimeSlider,
      ingredientsInInventorySlider,
      fewIngredientsSlider,
    ).then((data) => {
      if (data?.data?.error?.code == "SQLITE_CONSTRAINT") {
        setOpen(true);
        setPopupTitle("Error");
        setPopupText("Preset already exists with that name.");
      } else if (data?.data?.error || data === undefined) {
        setOpen(true);
        setPopupTitle("Error");
        setPopupText("Unknown error.");
      } else {
        setOpen(true);
        setPopupTitle("Success");
        setPopupText("Preset added.");
      }
    });
  };

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
          <PresetIcon setIconParent={setIcon} setColorParent={setColor} />
          <TextField
            sx={{ width: "80%", borderRadius: "50px" }}
            id="outlined-basic"
            label="Preset Name..."
            value={presetName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPresetName(event.target.value);
            }}
            variant="filled"
          />
          <div className="sliderGridContainer">
            <Container>
              <Typography>{"Short Cook Time"}</Typography>
              <Slider
                step={0.1}
                min={0}
                max={1}
                marks
                value={cookTimeSlider}
                onChange={(e) => setCookTimeSlider((e.target as any).value)}
                valueLabelDisplay="auto"
              />
            </Container>
            <Container>
              <Typography>{"Short Cook Time"}</Typography>
              <Slider
                step={0.1}
                min={0}
                max={1}
                marks
                value={ratingSlider}
                onChange={(e) => setRatingSlider((e.target as any).value)}
                valueLabelDisplay="auto"
              />
            </Container>
            <Container>
              <Typography>{"Short Cook Time"}</Typography>
              <Slider
                step={0.1}
                min={0}
                max={1}
                marks
                value={fewIngredientsSlider}
                onChange={(e) =>
                  setFewIngredientsSlider((e.target as any).value)
                }
                valueLabelDisplay="auto"
              />
            </Container>
            <Container>
              <Typography>{"Short Cook Time"}</Typography>
              <Slider
                step={0.1}
                min={0}
                max={1}
                marks
                value={ingredientsInInventorySlider}
                onChange={(e) =>
                  setIngredientsInInventorySlider((e.target as any).value)
                }
                valueLabelDisplay="auto"
              />
            </Container>
          </div>
          <OkDialog
            open={open}
            setOpen={setOpen}
            title={popupTitle}
            message={popupText}
          />
          <div className="buttonContainer">
            <button onClick={addNewPreset} className="button">
              Add Preset
            </button>
            <button className="button">Cancel</button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default CustomPreset;
