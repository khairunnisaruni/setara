// controllers/userController.js
import User from "../models/User.js";

export const getUsers = (req, res) => {
    User.getAll((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const deleteUser = (req, res) => {
    User.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "User berhasil dihapus", result });
    });
};