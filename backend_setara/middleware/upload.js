import multer from 'multer';
import path from 'path';

// Konfigurasi tempat penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Pastikan folder ini nanti ada di proyekmu
        cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
        // Memberi nama unik (timestamp) agar tidak bentrok
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

export default upload;