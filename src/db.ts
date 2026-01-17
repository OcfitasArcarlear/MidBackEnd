import Database from "better-sqlite3";


const db = new Database("database.sqlite", {
  verbose: console.log 
});


db.pragma("foreign_keys = ON");


db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`).run();


db.prepare(`
  CREATE TABLE IF NOT EXISTS attendance (
    AttendanceID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    Date TEXT NOT NULL,
    Status TEXT NOT NULL,
    CheckInTime TEXT,
    CheckOutTime TEXT,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
  )
`).run();
db.prepare("PRAGMA foreign_keys = ON").run();
export default db;
