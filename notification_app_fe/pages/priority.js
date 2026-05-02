import { useState, useEffect } from "react";
import {
  Container, Typography, Box, Select, MenuItem,
  FormControl, InputLabel, CircularProgress, Alert
} from "@mui/material";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../utils/api";
import { Log } from "../utils/logger";

const WEIGHT = { Placement: 3, Result: 2, Event: 1 };

export default function Priority() {
  const [notifications, setNotifications] = useState([]);
  const [n, setN] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      await Log("frontend", "info", "page", "Priority inbox page loaded");
      const data = await fetchNotifications({ limit: 50 });
      setNotifications(data);
    } catch (err) {
      setError("Failed to load notifications.");
      await Log("frontend", "error", "page", `Priority load failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const prioritized = [...notifications]
    .sort((a, b) => {
      const weightDiff = (WEIGHT[b.Type] || 0) - (WEIGHT[a.Type] || 0);
      if (weightDiff !== 0) return weightDiff;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Priority Inbox
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Show Top</InputLabel>
            <Select
              value={n}
              label="Show Top"
              onChange={(e) => setN(e.target.value)}
            >
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && prioritized.length === 0 && (
          <Alert severity="info">No notifications found.</Alert>
        )}

        {!loading &&
          !error &&
          prioritized.map((n, index) => (
            <Box key={n.ID}>
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                #{index + 1}
              </Typography>
              <NotificationCard notification={n} isNew={true} />
            </Box>
          ))}
      </Container>
    </>
  );
}