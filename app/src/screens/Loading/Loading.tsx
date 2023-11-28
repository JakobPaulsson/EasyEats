import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PositionedSnackbar from "../../components/PositionedSnackbar/PositionedSnackbar";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Loading() {
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [open, setOpen] = React.useState(true);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext broken in Loading.tsx");
  }

  const { login, setUserID } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      login();
      setUserID(1);
      setSnackbarOpen(false);
      setOpen(false);
      navigate("/dashboard");
    }, 3000);
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            ml: 5,
          }}
        >
          <Skeleton
            variant="text"
            width={200}
            height={150}
            sx={{
              borderRadius: "10px",
              marginLeft: "150px",
            }}
          />
          <Skeleton variant="text" width={350} height={5} sx={{}} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ marginLeft: "130px" }}
            />
            <Skeleton variant="text" width={100} sx={{}} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ marginLeft: "130px" }}
            />
            <Skeleton variant="text" width={100} sx={{}} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ marginLeft: "130px" }}
            />
            <Skeleton variant="text" width={100} sx={{}} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ marginLeft: "130px" }}
            />
            <Skeleton variant="text" width={100} sx={{}} />
          </Box>

          <Skeleton variant="text" width={350} height={5} sx={{}} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ marginLeft: "130px" }}
            />
            <Skeleton variant="text" width={100} sx={{}} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ marginLeft: "130px" }}
            />
            <Skeleton variant="text" width={100} sx={{}} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Skeleton variant="rectangular" width={1800} height={65} />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={1800}
            height={900}
          />
        </Box>
      </Box>
      <PositionedSnackbar
        open={snackbarOpen}
        vertical={"top"}
        horizontal={"center"}
        severity="success"
        message="Successfully Logged In"
      />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
