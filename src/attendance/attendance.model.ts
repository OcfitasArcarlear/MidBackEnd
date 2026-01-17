import db from "../db";


export interface Attendance {
  AttendanceID: number;
  UserID: number;
  Date: string;
  Status: string;
  CheckInTime: string | null;
  CheckOutTime: string | null;
}


export interface CreateAttendanceDTO {
  UserID: number;
  Date: string;
  Status: string;
  CheckInTime?: string;
  CheckOutTime?: string;
}


export interface UpdateAttendanceDTO {
  Date?: string;
  Status?: string;
  CheckInTime?: string;
  CheckOutTime?: string;
}


export function createAttendance(data: CreateAttendanceDTO) {
  const result = db.prepare(`
    INSERT INTO attendance (UserID, Date, Status, CheckInTime, CheckOutTime)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    data.UserID,
    data.Date,
    data.Status,
    data.CheckInTime ?? null,
    data.CheckOutTime ?? null
  );

  return result;
}


export function getAllAttendance(): Attendance[] {
  return db.prepare(`
    SELECT * FROM attendance
  `).all() as Attendance[];
}


export function getAttendanceWithUser() {
  return db.prepare(`
    SELECT
      a.AttendanceID,
      a.Date,
      a.Status,
      a.CheckInTime,
      a.CheckOutTime,
      u.UserID,
      u.name,
      u.email
    FROM attendance a
    INNER JOIN users u
      ON a.UserID = u.UserID
  `).all();
}


export function updateAttendance(
  id: number,
  data: UpdateAttendanceDTO
) {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.Date !== undefined) {
    fields.push("Date = ?");
    values.push(data.Date);
  }

  if (data.Status !== undefined) {
    fields.push("Status = ?");
    values.push(data.Status);
  }

  if (data.CheckInTime !== undefined) {
    fields.push("CheckInTime = ?");
    values.push(data.CheckInTime);
  }

  if (data.CheckOutTime !== undefined) {
    fields.push("CheckOutTime = ?");
    values.push(data.CheckOutTime);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const sql = `
    UPDATE attendance
    SET ${fields.join(", ")}
    WHERE AttendanceID = ?
  `;

  const result = db.prepare(sql).run(
    ...values,
    id
  );

  return result;
}


export function deleteAttendance(id: number) {
  const result = db.prepare(`
    DELETE FROM attendance WHERE AttendanceID = ?
  `).run(id);

  return result;
}
