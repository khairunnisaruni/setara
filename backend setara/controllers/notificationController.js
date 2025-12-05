// backend_setara/controllers/notificationController.js
import db from "../config/db.js";

const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    // PROGRAM
    let programSql = `
      SELECT id, judul_program, approved_at, created_at, added_by
      FROM programs
      WHERE status = 'approved'
    `;
    const programParams = [];
    if (userId) {
      programSql += " AND added_by = ?";
      programParams.push(userId);
    }
    programSql += " ORDER BY approved_at DESC, created_at DESC";
    const programRows = await query(programSql, programParams);
    const programNotifs = programRows.map((p) => ({
      type: "PROGRAM_APPROVED",
      title: "Program telah diverifikasi Admin.",
      message: `Program "${p.judul_program}" sudah terpublikasi dan siap diikuti.`,
      createdAt: p.approved_at || p.created_at,
    }));

    // MATERI
    let materiSql = `
      SELECT id, title, approved_at, created_at, uploaded_by
      FROM materi_multimedia
      WHERE status = 'approved'
    `;
    const materiParams = [];
    if (userId) {
      materiSql += " AND uploaded_by = ?";
      materiParams.push(userId);
    }
    materiSql += " ORDER BY approved_at DESC, created_at DESC";
    const materiRows = await query(materiSql, materiParams);
    const materiNotifs = materiRows.map((m) => ({
      type: "MATERI_APPROVED",
      title: "Materi Multimedia kamu telah diverifikasi Admin.",
      message: `Materi "${m.title}" sudah terpublikasi dan dapat diakses.`,
      createdAt: m.approved_at || m.created_at,
    }));

    // CERITA
    let ceritaSql = `
      SELECT id, title, approved_at, created_at, user_id
      FROM cerita
      WHERE status = 'approved'
    `;
    const ceritaParams = [];
    if (userId) {
      ceritaSql += " AND user_id = ?";
      ceritaParams.push(userId);
    }
    ceritaSql += " ORDER BY approved_at DESC, created_at DESC";
    const ceritaRows = await query(ceritaSql, ceritaParams);
    const ceritaNotifs = ceritaRows.map((c) => ({
      type: "CERITA_APPROVED",
      title: "Cerita kamu telah diverifikasi Admin.",
      message: `Cerita "${c.title}" sudah dipublikasikan.`,
      createdAt: c.approved_at || c.created_at,
    }));

    // DONASI
    let donasiSql = `
      SELECT id, title, approved_at, created_at, added_by
      FROM donasi
      WHERE status = 'approved'
    `;
    const donasiParams = [];
    if (userId) {
      donasiSql += " AND added_by = ?";
      donasiParams.push(userId);
    }
    donasiSql += " ORDER BY approved_at DESC, created_at DESC";
    const donasiRows = await query(donasiSql, donasiParams);
    const donasiNotifs = donasiRows.map((d) => ({
      type: "DONASI_APPROVED",
      title: "Donasi kamu telah diverifikasi Admin.",
      message: `Donasi "${d.title}" sudah terpublikasi.`,
      createdAt: d.approved_at || d.created_at,
    }));

    // KUIS
    let kuisSql = `
      SELECT id, title, approved_at, created_at, added_by
      FROM kuis
      WHERE status = 'approved'
    `;
    const kuisParams = [];
    if (userId) {
      kuisSql += " AND added_by = ?";
      kuisParams.push(userId);
    }
    kuisSql += " ORDER BY approved_at DESC, created_at DESC";
    const kuisRows = await query(kuisSql, kuisParams);
    const kuisNotifs = kuisRows.map((k) => ({
      type: "KUIS_APPROVED",
      title: "Kuis kamu telah diverifikasi Admin.",
      message: `Kuis "${k.title}" sudah bisa diakses peserta.`,
      createdAt: k.approved_at || k.created_at,
    }));

    // BUKU
    let bukuSql = `
      SELECT id, title, approved_at, created_at, added_by
      FROM rekomendasi_buku
      WHERE status = 'approved'
    `;
    const bukuParams = [];
    if (userId) {
      bukuSql += " AND added_by = ?";
      bukuParams.push(userId);
    }
    bukuSql += " ORDER BY approved_at DESC, created_at DESC";
    const bukuRows = await query(bukuSql, bukuParams);
    const bukuNotifs = bukuRows.map((b) => ({
      type: "BUKU_APPROVED",
      title: "Rekomendasi buku kamu telah diverifikasi Admin.",
      message: `Buku "${b.title}" sudah tayang di Pojok Buku.`,
      createdAt: b.approved_at || b.created_at,
    }));

    // AGENDA BESOK
    let agendaSql = `
      SELECT id, title, description, date, waktu, user_id
      FROM agenda
      WHERE date = DATE(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
    `;
    const agendaParams = [];
    if (userId) {
      agendaSql += " AND user_id = ?";
      agendaParams.push(userId);
    }
    const agendaRows = await query(agendaSql, agendaParams);
    const agendaNotifs = agendaRows.map((a) => ({
      type: "AGENDA_REMINDER",
      title: "Agenda Pelatihan Volunteer kamu telah tiba!",
      message: `Besok ada agenda: ${a.title} (${a.date} ${a.waktu}).`,
      createdAt: a.date,
    }));

    const all = [
      ...programNotifs,
      ...materiNotifs,
      ...ceritaNotifs,
      ...donasiNotifs,
      ...kuisNotifs,
      ...bukuNotifs,
      ...agendaNotifs,
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.json(all);
  } catch (error) {
    console.error("Error getUserNotifications:", error);
    return res
      .status(500)
      .json({ message: "Gagal mengambil notifikasi dari server" });
  }
};
