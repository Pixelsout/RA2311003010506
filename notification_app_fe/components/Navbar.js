import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";
import { Log } from "../utils/logger";

export default function Navbar() {
  const router = useRouter();

  const navigate = async (path) => {
    await Log("frontend", "info", "component", `Navigating to ${path}`);
    router.push(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a2e" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold" color="white">
          Campus Notifications
        </Typography>
        <Box>
          <Button
            startIcon={<NotificationsIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: router.pathname === "/" ? "#FFD700" : "white",
              fontWeight: router.pathname === "/" ? "bold" : "normal",
            }}
          >
            All
          </Button>
          <Button
            startIcon={<StarIcon />}
            onClick={() => navigate("/priority")}
            sx={{
              color: router.pathname === "/priority" ? "#FFD700" : "white",
              fontWeight: router.pathname === "/priority" ? "bold" : "normal",
            }}
          >
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}