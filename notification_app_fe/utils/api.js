import { Log } from "./logger";

export async function fetchNotifications(params = {}) {
  try {
    await Log("frontend", "info", "api", "Fetching notifications");

    const query = new URLSearchParams();
    if (params.limit) query.append("limit", params.limit);
    if (params.page) query.append("page", params.page);
    if (params.notification_type)
      query.append("notification_type", params.notification_type);

    const res = await fetch(`/api/notifications?${query.toString()}`);

    if (!res.ok) {
      await Log("frontend", "error", "api", `API error: ${res.status}`);
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    await Log("frontend", "info", "api", `Fetched ${data.notifications.length} notifications`);
    return data.notifications;
  } catch (err) {
    await Log("frontend", "fatal", "api", `Fetch failed: ${err.message}`);
    throw err;
  }
}