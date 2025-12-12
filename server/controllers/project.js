import { db } from "../connect.js";

// create a new project
export const addProject = async (req, res) => {
  const project = req.body;
  const values = [
    project.title,
    project.category,
    project.description,
    project.image,
    project.link,
  ];

  const q =
    "INSERT INTO Projects (`title`,`category`, `description`, `image`, `link`) VALUES (?)";

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
  const q = "SELECT * FROM Projects";

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
    project.link,
  ];
  const q = `UPDATE Projects 
    SET title = ?, category = ?, description = ?, image = ?, link = ?
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
  const q = `DELETE FROM Projects WHERE id = ?`;

  try {
    const [result] = await db.promise().query(q, [id]);

    // if project not exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
