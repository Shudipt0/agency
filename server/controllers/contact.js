import { db } from "../connect.js";

// create a new contact
export const addContact = async (req, res) => {
  const contact = req.body;
  const values = [
    contact.name,
    contact.email,
    contact.phone,
    contact.message,
  ];

  const q =
    "INSERT INTO Contacts (`name`,`email`, `phone`, `message`) VALUES (?)";
  try {
    const [result] = await db.promise().query(q, [values]);
    // build the new record object
    const newContact = {
      id: result.insertId,
      ...contact,
    };

    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all contacts
export const getAllContacts = async (req, res) => {
  const q = "SELECT * FROM Contacts";

  try {
    const [rows] = await db.promise().query(q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single contact by id
export const getContact = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM Contacts WHERE id = ?";

  try {
    const [rows] = await db.promise().query(q, [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a contact by id
export const updateContact = async (req, res) => {
  const id = req.params.id;
  const contact = req.body;
  const values = [
    contact.name,
    contact.email,
    contact.phone,
    contact.message,
  ];
  const q = `UPDATE Contacts 
    SET name = ?, email = ?, phone = ?, message = ?
    WHERE id = ? `;

  try {
    const [result] = await db.promise().query(q, [...values, id]);

    // if id not exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "contact not found" });
    }

    // build the new record object
    const newContact = {
      id: result.insertId,
      ...contact,
    };
    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single contact by id
export const deleteContact = async (req, res) => {
  const id = req.params.id;

  const q = `DELETE FROM Contacts WHERE id = ?`;

  try {
    // get contact first
    // const [rows] = await db.promise().query(id_q, [id]);
    // if (rows.length === 0) {
    //   return res.status(404).json({ message: "contact not found" });
    // }

    // const { image_public_id } = rows[0];

    // // 2️⃣ Delete image from Cloudinary
    // if (image_public_id) {
    //   try {
    //     const result = await cloudinary.uploader.destroy(image_public_id);
    //     console.log("Cloudinary result:", result);
    //   } catch (cloudErr) {
    //     console.error("Cloudinary delete failed:", cloudErr.message);
    //     // DO NOT stop execution
    //   }
    // }

    // delete from database
    const [result] = await db.promise().query(q, [id]);

    res
      .status(200)
      .json({ message: "contact deleted successfully", id: Number(id) });
  } catch (err) {
    res.status(500).json(err);
  }
};
