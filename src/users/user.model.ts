import { Hono } from 'hono'
import db from "../db";
const roleRoutes = new Hono()

export function getAllUsers() {
  return db.prepare(`
    SELECT * FROM users
  `).all();
}
export default roleRoutes;