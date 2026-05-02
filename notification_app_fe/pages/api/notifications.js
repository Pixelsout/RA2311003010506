const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJicjc3MTJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjkxMCwiaWF0IjoxNzc3NzAyMDEwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMGQzN2I1ZDUtNTQyMS00YmUyLThjZjUtODJlMjM4MmI3Y2QxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYmlzd2FqZWV0IHJvdXQiLCJzdWIiOiIxMTQ2NmNlZS03YTYzLTQyYWYtYmUxOC02ZjFkOTg2YzM0ZmEifSwiZW1haWwiOiJicjc3MTJAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJiaXN3YWplZXQgcm91dCIsInJvbGxObyI6InJhMjMxMTAwMzAxMDUwNiIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjExNDY2Y2VlLTdhNjMtNDJhZi1iZTE4LTZmMWQ5ODZjMzRmYSIsImNsaWVudFNlY3JldCI6InpaZXZ3cUV1a1FOZGZOd3AifQ.tHXWym7MWoNNrdwc9x_GwPxeD5da4sApQN30LPIJLMo";

export default async function handler(req, res) {
  try {
    const { limit, page, notification_type } = req.query;
    const query = new URLSearchParams();
    if (limit) query.append("limit", limit);
    if (page) query.append("page", page);
    if (notification_type) query.append("notification_type", notification_type);

    const response = await fetch(
      `http://20.207.122.201/evaluation-service/notifications?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}