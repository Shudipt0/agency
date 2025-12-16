import { db } from "../connect.js";

// create a new Project_Creators
export const addProject_Creators = async (req, res) => {
  const data = req.body;

  const q = `INSERT INTO Project_creators (project_id, creator_id)
SELECT p.id as project_id, m.id as creator_id
FROM Projects p
JOIN Members m
WHERE p.title = ?
  AND m.name = ?`;

  try {
    const [result] = await db
      .promise()
      .query(q, [data.product_title, data.creator_name]);
    // build the new record object
    // If no rows inserted → project or member not found
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project or Member not found",
      });
    }

    res.status(200).json({
      message: "Project creator added successfully",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all Project_Creators
export const getAllProject_Creators = async (req, res) => {
  // const q = "SELECT * FROM Projects";

  const q = `SELECT pc.id, p.title, m.name 
  FROM Project_creators AS pc
  LEFT JOIN Projects AS p ON (pc.project_id = p.id)
  LEFT JOIN Members AS m ON (pc.creator_id = m.id)`;

  try {
    const [rows] = await db.promise().query(q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single Project_Creators by id
export const getProject_Creators = async (req, res) => {
  const id = req.params.id;
  const q = `SELECT pc.id, p.title, m.name 
  FROM Project_creators AS pc
  LEFT JOIN Projects AS p ON (pc.project_id = p.id)
  LEFT JOIN Members AS m ON (pc.creator_id = m.id)
  WHERE (pc.id = ?)`;

  try {
    const [rows] = await db.promise().query(q, [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single Project_Creators by id
export const deleteProject_Creators = async (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM Project_creators WHERE id = ?`;

  try {
    // delete from database
    const [result] = await db.promise().query(q, [id]);
    res
      .status(200)
      .json({ message: "Project deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
