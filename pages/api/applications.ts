import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Create database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'is4300project',
  database: 'job_applications',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  try {
    if (method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM applications');
      return res.status(200).json(rows);
    }

    if (method === 'POST') {
      const {
        job_title,
        company_name,
        pay,
        location,
        job_status,
        job_deadline,
        job_rank,
        job_desc,
        job_notes,
        job_pros,
        job_cons,
      } = body;

      const queryStr = `
        INSERT INTO applications 
        (job_title, company_name, pay, location, job_status, job_deadline, job_rank, job_desc, job_notes, job_pros, job_cons)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        job_title, company_name, pay, location, job_status,
        job_deadline || null, job_rank, job_desc, job_notes,
        job_pros, job_cons,
      ];

      await pool.query(queryStr, values);
      return res.status(201).json({ message: 'Application added successfully' });
    }

    if (method === 'PUT') {
      const { id } = query;
      if (!id) return res.status(400).json({ error: 'Application ID is required' });

      const {
        job_title,
        company_name,
        pay,
        location,
        job_status,
        job_deadline,
        job_rank,
        job_desc,
        job_notes,
        job_pros,
        job_cons,
      } = body;

      const queryStr = `
        UPDATE applications SET
        job_title = ?, company_name = ?, pay = ?, location = ?, job_status = ?, 
        job_deadline = ?, job_rank = ?, job_desc = ?, job_notes = ?, 
        job_pros = ?, job_cons = ?
        WHERE id = ?
      `;
      const values = [
        job_title, company_name, pay, location, job_status,
        job_deadline || null, job_rank, job_desc, job_notes,
        job_pros, job_cons, id,
      ];

      const [result] = await pool.query(queryStr, values);
      if ((result as any).affectedRows === 0)
        return res.status(404).json({ error: 'Application not found' });

      return res.status(200).json({ message: 'Application updated successfully' });
    }

    if (method === 'DELETE') {
      const { id } = query;
      if (!id) return res.status(400).json({ error: 'Application ID is required' });

      const [result] = await pool.query('DELETE FROM applications WHERE id = ?', [id]);
      if ((result as any).affectedRows === 0)
        return res.status(404).json({ error: 'Application not found' });

      return res.status(200).json({ message: 'Application deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
