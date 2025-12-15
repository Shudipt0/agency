import { db } from "../connect.js";
import cloudinary from "../utilities/cloudinary.js";

// create a new service
export const addService = async (req, res) => {
  const service = req.body;
  const values = [
    service.service_name,
    service.description,
    service.image,
    service.image_public_id,
  ];

  const q =
    "INSERT INTO Services (`service_name`, `description`, `image`, `image_public_id`) VALUES (?)";

  try {
    const [result] = await db.promise().query(q, [values]);
    // build the new record object
    const newService = {
      id: result.insertId,
      ...service,
    };

    res.status(200).json(newService);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all services
export const getAllServices = async (req, res) => {
  const q = "SELECT * FROM Services";

  try {
    const [rows] = await db.promise().query(q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single service by id
export const getService = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM Services WHERE id = ?";

  try {
    const [rows] = await db.promise().query(q, [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a service by id
export const updateService = async (req, res) => {
  const id = req.params.id;
  const service = req.body;
  const values = [
    service.service_name,
    service.description,
    service.image,
    service.image_public_id,
  ];
  const q = `UPDATE Services 
    SET service_name = ?, description = ?, image = ?, image_public_id = ?
    WHERE id = ? `;

  try {
    const [result] = await db.promise().query(q, [...values, id]);

    // if id not exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "service not found" });
    }

    // build the new record object
    const newService = {
      id: result.insertId,
      ...service,
    };
    res.status(200).json(newService);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single service by id
export const deleteService = async (req, res) => {
  const id = req.params.id;
  const id_q = `SELECT image_public_id FROM Services WHERE id = ?`;
  const q = `DELETE FROM Services WHERE id = ?`;

  try {
    // get service first
    const [rows] = await db.promise().query(id_q, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "service not found" });
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
      .json({ message: "service deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
