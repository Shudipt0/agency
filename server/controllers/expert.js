import { db } from "../connect.js";
import cloudinary from "../utilities/cloudinary.js";

// create a new expert
export const addExpert = async (req, res) => {
  const expert = req.body;
  const values = [
    expert.expert_name,
    expert.bio_data,
    expert.thought,
    expert.image,
    expert.image_public_id,
  ];

  const q =
    "INSERT INTO Thoughts (`expert_name`,`bio_data`, `thought`, `image`, `image_public_id`) VALUES (?)";
  try {
    const [result] = await db.promise().query(q, [values]);
    // build the new record object
    const newExpert = {
      id: result.insertId,
      ...expert,
    };

    res.status(200).json(newExpert);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all experts
export const getAllexperts = async (req, res) => {
  const q = "SELECT * FROM Thoughts";

  try {
    const [rows] = await db.promise().query(q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single expert by id
export const getExpert = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM Thoughts WHERE id = ?";

  try {
    const [rows] = await db.promise().query(q, [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a expert by id
export const updateExpert = async (req, res) => {
  const id = req.params.id;
  const expert = req.body;
  const values = [
    expert.expert_name,
    expert.bio_data,
    expert.thought,
    expert.image,
    expert.image_public_id,
  ];
  const q = `UPDATE Thoughts 
    SET expert_name = ?, bio_data = ?, thought = ?, image = ?, image_public_id = ?
    WHERE id = ? `;

  try {
    const [result] = await db.promise().query(q, [...values, id]);

    // if id not exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "expert not found" });
    }

    // build the new record object
    const newExpert = {
      id: result.insertId,
      ...expert,
    };
    res.status(200).json(newExpert);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single expert by id
export const deleteExpert = async (req, res) => {
  const id = req.params.id;
  const id_q = `SELECT image_public_id FROM Thoughts WHERE id = ?`;
  const q = `DELETE FROM Thoughts WHERE id = ?`;

  try {
    // get expert first
    const [rows] = await db.promise().query(id_q, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "expert not found" });
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
      .json({ message: "expert deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
