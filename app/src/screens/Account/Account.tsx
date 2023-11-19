import React from "react";
import "./Account.css";
import { Paper, TextField, Box, Grid, Fab, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";

import PresetSlider from "../../components/PresetSlider/PresetSlider";

const Account: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        square={false}
        sx={{
          width: "600px",
          height: "600px",
          borderRadius: "20px",
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 120,
              height: 120,
              backgroundColor: "grey",
            }}
          ></Paper>
          <TextField
            sx={{
              width: "30%",
              borderRadius: "40px",
            }}
            id="outlined-basic"
            label="Preset Name"
            variant="standard"
          >
            Yeah
          </TextField>
          <Box
            sx={{
              width: "60%",
              mt: 3,
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={10}>
              <Grid item xs={6}>
                <PresetSlider name="Previously Used Ingredients" value={50} />
              </Grid>
              <Grid item xs={6}>
                <PresetSlider name="Something New" value={50} />
              </Grid>
              <Grid item xs={6}>
                <PresetSlider name="Short Cook Time" value={50} />
              </Grid>
              <Grid item xs={6}>
                <PresetSlider name="Rating" value={50} />
              </Grid>
              <Grid item xs={6}>
                <PresetSlider name="Few Ingredients" value={50} />
              </Grid>
              <Grid item xs={6}>
                <PresetSlider name="Ingredients in Inventory" value={50} />
              </Grid>
            </Grid>
          </Box>
          <Tooltip title="Add preset" arrow>
            <Fab
              color="primary"
              aria-label="add"
              size={"small"}
              data-cy={"addButton"}
            >
              <Add />
            </Fab>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};
export default Account;
