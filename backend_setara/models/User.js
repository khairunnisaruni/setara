// models/User.js
import db from "../config/db.js";

const User = {
    getAll: (callback) => {
        const sql = "SELECT * FROM users";
        db.query(sql, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM users WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

export default User;