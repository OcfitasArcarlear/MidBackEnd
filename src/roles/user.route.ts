import { Hono } from "hono";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceWithUser,
  updateAttendance,
  deleteAttendance,
} from "../attendance/attendance.model";

const app = new Hono();


app.post("/attendance", async (c) => {
  const body = await c.req.json();

  if (!body.UserID || !body.Date || !body.Status)
    return c.json({ error: "UserID, Date, Status required" }, 400);

  const result = createAttendance(body);
  return c.json({ id: result.lastInsertRowid }, 201);
});


app.get("/attendance", (c) =>
  c.json(getAllAttendance())
);


app.get("/attendance/with-user", (c) =>
  c.json(getAttendanceWithUser())
);


app.put("/attendance/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!id) return c.json({ error: "Invalid id" }, 400);

  updateAttendance(id, await c.req.json());
  return c.json({ message: "Updated" });
});


app.delete("/attendance/:id", (c) => {
  const id = Number(c.req.param("id"));
  if (!id) return c.json({ error: "Invalid id" }, 400);

  deleteAttendance(id);
  return c.json({ message: "Deleted" });
});

export default app;
