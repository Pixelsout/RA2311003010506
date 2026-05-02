import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import WorkIcon from "@mui/icons-material/Work";
import GradeIcon from "@mui/icons-material/Grade";

const typeConfig = {
  Event: { color: "#4CAF50", icon: <EventIcon fontSize="small" /> },
  Result: { color: "#2196F3", icon: <GradeIcon fontSize="small" /> },
  Placement: { color: "#FF9800", icon: <WorkIcon fontSize="small" /> },
};

export default function NotificationCard({ notification, isNew }) {
  const config = typeConfig[notification.Type] || {
    color: "#999",
    icon: null,
  };

  return (
    <Card
      sx={{
        mb: 2,
        border: isNew ? `2px solid ${config.color}` : "2px solid transparent",
        backgroundColor: isNew ? "#ffffff" : "#f5f5f5",
        opacity: isNew ? 1 : 0.7,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 6, opacity: 1 },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            icon={config.icon}
            label={notification.Type}
            size="small"
            sx={{
              backgroundColor: config.color,
              color: "white",
              fontWeight: "bold",
            }}
          />
          {isNew && (
            <Chip
              label="NEW"
              size="small"
              sx={{ backgroundColor: "#ff4444", color: "white", fontWeight: "bold" }}
            />
          )}
        </Box>
        <Typography variant="h6" mt={1} fontWeight="bold">
          {notification.Message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}