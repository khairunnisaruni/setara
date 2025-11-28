// backend_setara/controllers/programController.js
import Program from "../models/Program.js";

const mapProgramTypeToCategory = (programType) => {
  switch (programType) {
    case "volunteer":
    case "pengabdian":
      return "relawan";
    case "beasiswa":
      return "beasiswa";
    default:
      return "pendidikan";
  }
};

const mapStatusToEnum = (status) => {
  switch (status) {
    case "Akan Datang":
      return "akan datang";
    case "Sedang Berjalan":
      return "sedang berlangsung";
    case "Selesai":
      return "selesai";
    default:
      return "akan datang";
  }
};

export const createProgram = async (req, res) => {
  try {
    const {
      title,
      organizer,
      programType,
      location,
      description,
      period,
      deadline,
      status,
      link,
      banner,
      added_by,
    } = req.body;

    if (!title || !programType || !description || !link) {
      return res.status(400).json({ message: "Field wajib belum lengkap." });
    }

    const category = mapProgramTypeToCategory(programType);
    const status_program = mapStatusToEnum(status);

    const tanggal_mulai = null;
    const tanggal_berakhir = deadline || null;

    const result = await Program.create({
      title,
      category,
      description,
      tanggal_mulai,
      tanggal_berakhir,
      status_program,
      link,
      added_by: added_by || 1,
    });

    return res.status(201).json({
      message: "Program berhasil dibuat",
      insertId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error createProgram:", error);
    return res.status(500).json({ message: "Terjadi kesalahan di server." });
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
