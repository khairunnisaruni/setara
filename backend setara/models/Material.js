// models/Material.js
const db = require('../config/db');

const Material = {
  create: async (materialData) => {
    const query = `
      INSERT INTO materi_multimedia 
      (title, description, file_path, file_type, kategori_kelas_id, kategori_id, uploaded_by, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `;
    
    const [result] = await db.execute(query, [
      materialData.title,
      materialData.description,
      materialData.file_path,
      materialData.file_type,
      materialData.kategori_kelas_id,
      materialData.kategori_id,
      materialData.uploaded_by || null
    ]);
    
    return result;
  },

  findAll: async (filters = {}) => {
    let query = `
      SELECT m.*, 
             kk.nama_kelas as class_name,
             k.nama_kategori as category_name
      FROM materi_multimedia m
      LEFT JOIN kategori_kelas kk ON m.kategori_kelas_id = kk.id
      LEFT JOIN kategori k ON m.kategori_id = k.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (filters.status) {
      query += ' AND m.status = ?';
      params.push(filters.status);
    }
    
    if (filters.kategori_kelas_id) {
      query += ' AND m.kategori_kelas_id = ?';
      params.push(filters.kategori_kelas_id);
    }
    
    query += ' ORDER BY m.created_at DESC';
    
    const [rows] = await db.execute(query, params);
    return rows;
  },

  findById: async (id) => {
    const query = 'SELECT * FROM materi_multimedia WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }
};

module.exports = Material;
