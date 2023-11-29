import * as React from "react";
import { Box, Paper, Button, Typography, Divider } from "@mui/material";
import { PresetIcons } from "../../types/icons.interface";
import PaperHeader from "../../components/PaperHeader/PaperHeader";

export const PresetSelector = ({ presets }: any) => {
  return (
    <Paper
      elevation={5}
      sx={{
        width: 250,
        borderRadius: "10px",
        mt: 3,
      }}
    >
      <PaperHeader title="Created Presets" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "50px",
        }}
      >
        {presets?.map((preset: any) => {
          for (const key in PresetIcons) {
            if (preset.Icon == PresetIcons[key].name) {
              const Icon = PresetIcons[key].value;
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      sx={{
                        ml: 2,
                        fontSize: "2.2rem",
                        color: `#${preset.Color}`,
                      }}
                    ></Icon>
                    <Typography
                      align="center"
                      variant="body1"
                      sx={{
                        m: "0 auto",
                      }}
                    >
                      {preset.Name}
                    </Typography>
                    <Button
                      sx={{
                        marginLeft: "auto",
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Divider />
                </>
              );
            }
          }
        })}
      </Box>
    </Paper>
  );
};
