import { db } from "../connect.js";
import cloudinary from "../utilities/cloudinary.js";

// create a new user
export const addUser = async (req, res) => {
  const user = req.body;
  const values = [
    user.name,
    user.profession,
    user.bio_data,
    user.image,
    user.image_public_id,
  ];

  const q =
    "INSERT INTO Members (`name`,`profession`, `bio_data`, `image`, `image_public_id`) VALUES (?)";

  try {
    const [result] = await db.promise().query(q, [values]);
    // build the new record object
    const newUser = {
      id: result.insertId,
      ...user,
    };

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  const q = "SELECT * FROM Members";

  try {
    const [rows] = await db.promise().query(q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single user by id
export const getUser = async (req, res) => {
  const id = req.params.id;
  // const q = "SELECT * FROM Members WHERE id = ?";

  const q = `SELECT m.id, m.name, m.profession, m.bio_data, m.image,
  COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'project_id', p.id,
                'title', p.title
            )
        ),
        JSON_ARRAY()
    ) AS projects
  FROM Members AS m
 LEFT JOIN Project_creators AS pc ON (m.id = pc.creator_id)
 LEFT JOIN Projects AS p ON (pc.project_id = p.id)
 WHERE (m.id = ?)
 GROUP BY m.id, m.name`;

  try {
    const [rows] = await db.promise().query(q, [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a user by id
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const values = [
    user.name,
    user.profession,
    user.bio_data,
    user.image,
    user.image_public_id,
  ];
  const q = `UPDATE Members 
    SET name = ?, profession = ?, bio_data = ?, image = ?, image_public_id = ?
    WHERE id = ? `;

  try {
    const [result] = await db.promise().query(q, [...values, id]);

    // if id not exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    // build the new record object
    const newuser = {
      id: result.insertId,
      ...user,
    };
    res.status(200).json(newuser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single user by id
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const id_q = `SELECT image_public_id FROM Members WHERE id = ?`;
  const q = `DELETE FROM Members WHERE id = ?`;

  try {
    // get user first
    const [rows] = await db.promise().query(id_q, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
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
      .json({ message: "user deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
