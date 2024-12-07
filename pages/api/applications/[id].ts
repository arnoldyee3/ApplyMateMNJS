// pages/api/applications/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '../../../components/db.js';
import mysql from 'mysql2/promise';

// Create database connection pool
// const pool = mysql.createPool({
//   host: 'sql5.freesqldatabase.com',
//   user: 'sql5750355',
//   password: 'wsp919t2xI',
//   database: 'sql5750355'
// })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  try {
    const pool = await getPool();

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Valid Application ID is required" });
    }

    if (method === "GET") {
      const [rows] = await pool.query("SELECT * FROM applications WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ error: "Application not found" });
      return res.status(200).json(rows[0]);
    }

    if (method === "PATCH") {
      const fields = req.body;

      if (!fields || Object.keys(fields).length === 0) {
        return res.status(400).json({ error: "No fields to update provided" });
      }

      const updates = Object.keys(fields)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = [...Object.values(fields), id];

      const queryStr = `UPDATE applications SET ${updates} WHERE id = ?`;
      const [result] = await pool.query(queryStr, values);

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      return res.status(200).json(fields); // Return updated fields for confirmation
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
