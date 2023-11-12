import { Box, Container, Divider, Paper, Typography } from "@mui/material";

function InventoryDisplay() {
  return (
    <Paper
      elevation={8}
      square={false}
      sx={{
        ml: 20,
        mt: 3,
        width: "500px",
        height: "600px",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "grey",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Container>
          <Typography
            variant="h6"
            gutterBottom
            component="h5"
            marginBottom={"unset"}
          >
            Inventory
          </Typography>
        </Container>
      </Box>
      <Divider />
      <div className="inventoryBody" />
      <div className="inventoryFooter" />
    </Paper>
  );
}

export default InventoryDisplay;
