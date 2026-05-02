import { useState, useEffect } from "react";
import {
  Container, Typography, Box, Button, ButtonGroup,
  CircularProgress, Alert
} from "@mui/material";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../utils/api";
import { Log } from "../utils/logger";

const FILTERS = ["All", "Event", "Result", "Placement"];

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("viewedIds") || "[]");
    setViewed(saved);
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      await Log("frontend", "info", "page", "All notifications page loaded");
      const data = await fetchNotifications({});
      setNotifications(data);
      const ids = data.map((n) => n.ID);
      localStorage.setItem("viewedIds", JSON.stringify(ids));
      setViewed(ids);
    } catch (err) {
      setError("Failed to load notifications. Please try again.");
      await Log("frontend", "error", "page", `Failed to load: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          All Notifications
        </Typography>

        {/* Filter Buttons */}
        <ButtonGroup sx={{ mb: 3 }}>
          {FILTERS.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "contained" : "outlined"}
              onClick={() => setFilter(f)}
              sx={{
                backgroundColor: filter === f ? "#1a1a2e" : "transparent",
                color: filter === f ? "white" : "#1a1a2e",
                borderColor: "#1a1a2e",
                "&:hover": { backgroundColor: "#1a1a2e", color: "white" },
              }}
            >
              {f}
            </Button>
          ))}
        </ButtonGroup>

        {/* States */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && filtered.length === 0 && (
          <Alert severity="info">No notifications found.</Alert>
        )}

        {/* Notification List */}
        {!loading &&
          !error &&
          filtered.map((n) => (
            <NotificationCard
              key={n.ID}
              notification={n}
              isNew={!viewed.includes(n.ID)}
            />
          ))}
      </Container>
    </>
  );
}