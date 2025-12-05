
// backend_setara/controllers/programController.js
import Program from "../models/Program.js";


export const getPrograms = (req, res) => {
    Program.getAlls((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data program" });
        return res.json(data);
    });
};

export const createPrograms = (req, res) => {
    const posterBanner = req.file ? req.file.filename : null;
    const data = { ...req.body, added_by: 1 }; // Default Admin ID = 1

    Program.creates(data, posterBanner, (err, result) => {
        if (err) {
            console.error("Error Create Program:", err);
            return res.status(500).json({ error: "Gagal tambah program" });
        }
        return res.json({ message: "Program berhasil ditambahkan", result });
    });
};

export const updateProgram = (req, res) => {
    const id = req.params.id;
    const posterBanner = req.file ? req.file.filename : null;

    Program.updates(id, req.body, posterBanner, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update program" });
        return res.json({ message: "Program berhasil diupdate", result });
    });
};

export const deleteProgram = (req, res) => {
    Program.deletes(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus program" });
        return res.json({ message: "Program berhasil dihapus", result });
    });
};

export const updateProgramStatus = (req, res) => {
    const { status } = req.body;
    Program.updateStatuss(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status program berhasil diubah", result });
    });
};

const mapProgramTypeToJenis = (programType) => {
  switch (programType) {
    case "volunteer":
      return "Volunteer";
    case "pengabdian":
      return "Pengabdian Masyarakat";
    case "beasiswa":
      return "Beasiswa";
    default:
      return "Volunteer";
  }
};

// map dari label status di frontend ke enum status_program di DB
const mapStatusToEnum = (status) => {
  switch (status) {
    case "Akan Datang":
      return "akan datang";
    case "Sedang Berjalan":
    case "Sedang Dibuka":
      return "sedang dibuka";
    case "Selesai":
      return "selesai";
    default:
      return "akan datang";
  }
};

export const createProgram = async (req, res) => {
  try {
    const {
      title,        // judul program di form
      organizer,    // penyelenggara
      programType,  // volunteer / pengabdian / beasiswa
      location,     // lokasi program
      description,  // deskripsi
      period,       // teks periode_tanggal
      deadline,     // deadline_pendaftaran (YYYY-MM-DD)
      status,       // status tampilan
      link,         // tautan_sumber_resmi
      banner,       // poster_banner (URL/nama file)
      added_by,     // id user (boleh opsional)
    } = req.body;


    if (!title || !programType || !description || !link) {
      return res.status(400).json({ message: "Field wajib belum lengkap." });
    }

    const jenis_program = mapProgramTypeToJenis(programType);
    const status_program = mapStatusToEnum(status);

    const data = {
      judul_program: title,
      penyelenggara: organizer,
      jenis_program,
      lokasi_program: location,
      deskripsi_program: description,
      periode_tanggal: period,
      deadline_pendaftaran: deadline || null,
      status_program,
      tautan_sumber_resmi: link,
      poster_banner: banner || null,
      added_by: added_by || 1,
    };

    const result = await Program.create(data);

    return res.status(201).json({
      message: "Program berhasil dibuat",
      insertId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error createProgram:", error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan di server." });
  }
};

export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.getAll();
    return res.status(200).json(programs);
  } catch (error) {
    console.error("❌ Error getAllPrograms:", error);
    return res.status(500).json({ message: "Gagal mengambil data program." });
  }
};
