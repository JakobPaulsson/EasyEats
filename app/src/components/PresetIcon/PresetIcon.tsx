import React, { useState } from "react";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { Paper, Box, Container } from "@mui/material";

interface PresetIconProps {
  setIconParent: (icon: string) => void;
  setColorParent: (color: string) => void;
}

const PresetIcon = ({ setIconParent, setColorParent }: PresetIconProps) => {
  const [icon, setIcon] = useState("PedalBikeIcon");
  const [color, setColor] = useState("#65D663");

  const renderSelectedIcon = () => {
    switch (icon) {
      case "PedalBikeIcon":
        return <PedalBikeIcon sx={{ fontSize: 80, color: color }} />;
      case "BeachAccessIcon":
        return <BeachAccessIcon sx={{ fontSize: 80, color: color }} />;
      case "DownhillSkiingIcon":
        return <DownhillSkiingIcon sx={{ fontSize: 80, color: color }} />;
      case "RestaurantIcon":
        return <RestaurantIcon sx={{ fontSize: 80, color: color }} />;
      case "RestaurantMenuIcon":
        return <RestaurantMenuIcon sx={{ fontSize: 80, color: color }} />;
      default:
        return null;
    }
  };

  const renderColorSelector = (color: string) => {
    return (
      <Paper
        elevation={6}
        onClick={() => {
          setColor(color);
          setColorParent(color);
        }}
        sx={{
          width: 30,
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: color,
          }}
        ></Box>
      </Paper>
    );
  };

  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          elevation={3}
          square={false}
          sx={{
            width: 200,
            height: 200,
            mt: 5,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
              gap: 1.5,
            }}
          >
            <PedalBikeIcon
              sx={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                setIcon("PedalBikeIcon");
                setIconParent("PedalBikeIcon");
              }}
            />
            <BeachAccessIcon
              sx={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                setIcon("BeachAccessIcon");
                setIconParent("BeachAccessIcon");
              }}
            />
            <DownhillSkiingIcon
              sx={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                setIcon("DownhillSkiingIcon");
                setIconParent("DownhillSkiingIcon");
              }}
            />
            <RestaurantIcon
              sx={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                setIcon("RestaurantIcon");
                setIconParent("RestaurantIcon");
              }}
            />
            <RestaurantMenuIcon
              sx={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                setIcon("RestaurantMenuIcon");
                setIconParent("RestaurantMenuIcon");
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            {renderSelectedIcon()}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 3.5,
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            {renderColorSelector("#65D663")}
            {renderColorSelector("#639ED6")}
            {renderColorSelector("#D69363")}
            {renderColorSelector("#BD3838")}
            {renderColorSelector("#DAF148")}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PresetIcon;
