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

    // PROGRAM (approved + rejected)
    let programSql = `
      SELECT id, judul_program, status, approved_at, created_at, added_by
      FROM programs
      WHERE status IN ('approved','rejected')
    `;
    const programParams = [];
    if (userId) {
      programSql += " AND added_by = ?";
      programParams.push(userId);
    }
    programSql += " ORDER BY approved_at DESC, created_at DESC";
    const programRows = await query(programSql, programParams);
    const programNotifs = programRows.map((p) => {
      const isApproved = p.status === "approved";
      return {
        type: isApproved ? "PROGRAM_APPROVED" : "PROGRAM_REJECTED",
        title: isApproved
          ? "Program telah diverifikasi Admin."
          : "Program kamu belum dapat dipublikasikan.",
        message: isApproved
          ? `Program "${p.judul_program}" sudah terpublikasi dan siap diikuti.`
          : `Program "${p.judul_program}" ditolak Admin. Periksa kembali data dan ajukan ulang.`,
        createdAt: p.approved_at || p.created_at,
      };
    });

    // MATERI (approved + rejected)
    let materiSql = `
      SELECT id, title, status, approved_at, created_at, uploaded_by
      FROM materi_multimedia
      WHERE status IN ('approved','rejected')
    `;
    const materiParams = [];
    if (userId) {
      materiSql += " AND uploaded_by = ?";
      materiParams.push(userId);
    }
    materiSql += " ORDER BY approved_at DESC, created_at DESC";
    const materiRows = await query(materiSql, materiParams);
    const materiNotifs = materiRows.map((m) => {
      const isApproved = m.status === "approved";
      return {
        type: isApproved ? "MATERI_APPROVED" : "MATERI_REJECTED",
        title: isApproved
          ? "Materi Multimedia kamu telah diverifikasi Admin."
          : "Materi Multimedia kamu belum dapat dipublikasikan.",
        message: isApproved
          ? `Materi "${m.title}" sudah terpublikasi dan dapat diakses.`
          : `Materi "${m.title}" ditolak Admin. Periksa kembali materi dan ajukan ulang.`,
        createdAt: m.approved_at || m.created_at,
      };
    });

    // CERITA (approved + rejected)
    let ceritaSql = `
      SELECT id, title, status, approved_at, created_at, user_id
      FROM cerita
      WHERE status IN ('approved','rejected')
    `;
    const ceritaParams = [];
    if (userId) {
      ceritaSql += " AND user_id = ?";
      ceritaParams.push(userId);
    }
    ceritaSql += " ORDER BY approved_at DESC, created_at DESC";
    const ceritaRows = await query(ceritaSql, ceritaParams);
    const ceritaNotifs = ceritaRows.map((c) => {
      const isApproved = c.status === "approved";
      return {
        type: isApproved ? "CERITA_APPROVED" : "CERITA_REJECTED",
        title: isApproved
          ? "Cerita kamu telah diverifikasi Admin."
          : "Cerita kamu belum dapat dipublikasikan.",
        message: isApproved
          ? `Cerita "${c.title}" sudah dipublikasikan.`
          : `Cerita "${c.title}" ditolak Admin. Periksa kembali isi cerita dan ajukan ulang.`,
        createdAt: c.approved_at || c.created_at,
      };
    });

    // DONASI (approved + rejected)
    let donasiSql = `
      SELECT id, title, status, approved_at, created_at, added_by
      FROM donasi
      WHERE status IN ('approved','rejected')
    `;
    const donasiParams = [];
    if (userId) {
      donasiSql += " AND added_by = ?";
      donasiParams.push(userId);
    }
    donasiSql += " ORDER BY approved_at DESC, created_at DESC";
    const donasiRows = await query(donasiSql, donasiParams);
    const donasiNotifs = donasiRows.map((d) => {
      const isApproved = d.status === "approved";
      return {
        type: isApproved ? "DONASI_APPROVED" : "DONASI_REJECTED",
        title: isApproved
          ? "Donasi kamu telah diverifikasi Admin."
          : "Donasi kamu belum dapat dipublikasikan.",
        message: isApproved
          ? `Donasi "${d.title}" sudah terpublikasi.`
          : `Donasi "${d.title}" ditolak Admin. Periksa kembali data dan ajukan ulang.`,
        createdAt: d.approved_at || d.created_at,
      };
    });

    // KUIS (approved + rejected)
    let kuisSql = `
      SELECT id, title, status, approved_at, created_at, added_by
      FROM kuis
      WHERE status IN ('approved','rejected')
    `;
    const kuisParams = [];
    if (userId) {
      kuisSql += " AND added_by = ?";
      kuisParams.push(userId);
    }
    kuisSql += " ORDER BY approved_at DESC, created_at DESC";
    const kuisRows = await query(kuisSql, kuisParams);
    const kuisNotifs = kuisRows.map((k) => {
      const isApproved = k.status === "approved";
      return {
        type: isApproved ? "KUIS_APPROVED" : "KUIS_REJECTED",
        title: isApproved
          ? "Kuis kamu telah diverifikasi Admin."
          : "Kuis kamu belum dapat dipublikasikan.",
        message: isApproved
          ? `Kuis "${k.title}" sudah bisa diakses peserta.`
          : `Kuis "${k.title}" ditolak Admin. Periksa kembali soal/ketentuan dan ajukan ulang.`,
        createdAt: k.approved_at || k.created_at,
      };
    });

    // BUKU (approved + rejected)
    let bukuSql = `
      SELECT id, title, status, approved_at, created_at, added_by
      FROM rekomendasi_buku
      WHERE status IN ('approved','rejected')
    `;
    const bukuParams = [];
    if (userId) {
      bukuSql += " AND added_by = ?";
      bukuParams.push(userId);
    }
    bukuSql += " ORDER BY approved_at DESC, created_at DESC";
    const bukuRows = await query(bukuSql, bukuParams);
    const bukuNotifs = bukuRows.map((b) => {
      const isApproved = b.status === "approved";
      return {
        type: isApproved ? "BUKU_APPROVED" : "BUKU_REJECTED",
        title: isApproved
          ? "Rekomendasi buku kamu telah diverifikasi Admin."
          : "Rekomendasi buku kamu belum dapat dipublikasikan.",
        message: isApproved
          ? `Buku "${b.title}" sudah tayang di Pojok Buku.`
          : `Buku "${b.title}" ditolak Admin. Periksa kembali data buku dan ajukan ulang.`,
        createdAt: b.approved_at || b.created_at,
      };
    });

    // AGENDA BESOK (tetap, tidak pakai status)
    let agendaSql = `
      SELECT id, title, description, date, waktu, user_id, created_at
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
      createdAt: a.created_at || a.date,
    }));

    // GABUNG & URUTKAN TERBARU DI ATAS
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
