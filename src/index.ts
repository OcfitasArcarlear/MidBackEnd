import { Hono } from "hono";
import userRoute from "./roles/user.route";
import { serve } from "@hono/node-server";

const app = new Hono();


app.use("*", async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});


app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json(
    { error: "Internal Server Error" },
    500
  );
});


app.route("/api", userRoute);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})


