import React from "react";
import "./Account.css";
import CustomPreset from "../../components/CustomPreset/CustomPreset";
import { PresetSelector } from "../../components/PresetSelector/PresetSelector";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PaperHeader from "../../components/PaperHeader/PaperHeader";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import { TabContext, TabList } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Account() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: "70%",
        borderRadius: "10px",
        mt: 5,
        mb: 5,
        height: "900px",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Create Preset" {...a11yProps(0)} />
        <Tab label="Show Presets" {...a11yProps(1)} />
      </Tabs>
      <Divider />
      <Box>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <CustomPreset />
            <PresetSelector />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mt: 30,
            }}
          >
            <PresetSelector />
          </Box>
        </TabPanel>
      </Box>
    </Paper>
  );
}

export default Account;
