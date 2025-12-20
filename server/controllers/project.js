import { db } from "../connect.js";
import cloudinary from "../utilities/cloudinary.js";

// create a new project
export const addProject = async (req, res) => {
  const project = req.body;
  const values = [
    project.title,
    project.category,
    project.description,
    project.image,
    project.image_public_id,
    project.link,
  ];

  const q =
    "INSERT INTO Projects (`title`,`category`, `description`, `image`, `image_public_id`, `link`) VALUES (?)";

  try {
    const [result] = await db.promise().query(q, [values]);
    // build the new record object
    const newProject = {
      id: result.insertId,
      ...project,
    };

    res.status(200).json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all projects
export const getAllProjects = async (req, res) => {
  // const q = "SELECT * FROM Projects";

  const q = `SELECT 
   p.id,
   p.title,
   p.category,
   p.description,
   p.image,
   p.link,
  COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                 'creator_id', m.id,
                 'name', m.name
            )
        ),
     JSON_ARRAY()
  ) AS creators
FROM Projects AS p
LEFT JOIN Project_creators AS pc ON (p.id = pc.project_id)
LEFT JOIN Members AS m ON (pc.creator_id = m.id)
GROUP BY p.id;`

  try {
    const [rows] = await db.promise().query(q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single project by id
export const getProject = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM Projects WHERE id = ?";

  try {
    const [rows] = await db.promise().query(q, [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a project by id
export const updateProject = async (req, res) => {
  const id = req.params.id;
  const project = req.body;
  const values = [
    project.title,
    project.category,
    project.description,
    project.image,
    project.image_public_id,
    project.link,
  ];
  const q = `UPDATE Projects 
    SET title = ?, category = ?, description = ?, image = ?, image_public_id = ?, link = ?
    WHERE id = ? `;

  try {
    const [result] = await db.promise().query(q, [...values, id]);

    // if id not exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    // build the new record object
    const newProject = {
      id: result.insertId,
      ...project,
    };
    res.status(200).json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single project by id
export const deleteProject = async (req, res) => {
  const id = req.params.id;
  const id_q = `SELECT image_public_id FROM Projects WHERE id = ?`;
  const q = `DELETE FROM Projects WHERE id = ?`;

  try {
    // get project first
    const [rows] = await db.promise().query(id_q, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { image_public_id } = rows[0];

    // 2️⃣ Delete image from Cloudinary
    if (image_public_id) {
      try {
        const result = await cloudinary.uploader.destroy(image_public_id);
        console.log("Cloudinary result:", result);
      } catch (cloudErr) {
        console.error("Cloudinary delete failed:", cloudErr.message);
        // DO NOT stop execution
      }
    }

    // delete from database
    const [result] = await db.promise().query(q, [id]);

    res
      .status(200)
      .json({ message: "Project deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
