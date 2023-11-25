import * as React from "react";

import { Box, Paper, Button, Typography, Divider } from "@mui/material";

import { getPresets } from "../../services/PresetService";
import { PresetIcons } from "../../types/icons.interface";
import PaperHeader from "../../components/PaperHeader/PaperHeader";

export const PresetSelector = () => {
  const [presets, setPresets] = React.useState<any>();

  React.useEffect(() => {
    getPresets(1).then((data) => {
      if (data) {
        setPresets(data.data.query);
      }
    });
  }, []);

  return (
    <Paper
      elevation={6}
      sx={{
        width: 250,
        height: "250px",
        borderRadius: "10px",
      }}
    >
      <PaperHeader title="Created Presets" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
