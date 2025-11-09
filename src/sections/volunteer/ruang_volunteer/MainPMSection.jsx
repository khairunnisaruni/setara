import React from "react";
import DropDownPM from "../../../components/DropDownPM";

const MainPMSection = () => {
  return (
    <div className=" flex flex-col items-center gap-y-10 py-10">
      <div className=" text-6xl font-bold text-center flex flex-col items-center gap-y-4  p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        {" "}
        <div>
          <span className="bg-[#FFFFFF] bg-clip-text text-transparent drop-shadow-md">
            Panduan
          </span>{" "}
          <span className="bg-[linear-gradient(90deg,#FFB54D_0%,#FBF8F4_25.48%,#FFB54D_100%)] bg-clip-text text-transparent drop-shadow-md">
            Mengajar
          </span>
        </div>
        <div className="flex max-w-[55%] text-lg font-normal text-[#FFFFFF] text-center flex-col items-center font-sans">
          <div>
            Bagikan dan temukan rekomendasi buku terbaik untuk pembelajaran
          </div>
        </div>
      </div>

      {/* <div className='flex text-6xl font-bold flex-col items-center gap-y-4'>
                <div className="">
                    <div>Panduan <span className="bg-[#FF9500] bg-clip-text text-transparent drop-shadow-md">Mengajar</span></div>
                </div>
                <div className="flex max-w-[55%] text-lg font-normal text-[#757570] text-center flex-col items-center font-sans">
                    <div>
                        Temukan berbagai sumber daya untuk membantu Anda mempersiapkan dan melaksanakan kegiatan mengajar yang menyenangkan dan efektif
                    </div>
                </div>
            </div> */}

      <div className="rounded-xl bg-white w-1/2 py-1 px-2 border border-[#E7E1DA]">
        <DropDownPM
          name="Menggunakan Chatbot AI"
          explain="Chatbot AI dapat membantu Anda menjawab pertanyaan siswa secara otomatis. Klik pada menu Chatbot AI di navigation bar, kemudian ketik pertanyaan atau topik yang ingin dibahas. Bot akan memberikan respons yang relevan dan edukatif untuk mendukung proses pembelajaran."
        />
        <DropDownPM
          name="Menggunakan Game Interaktiff"
          explain="Game interaktif menggunakan platform kuis lainnya yang mudah diakses dan gratis untuk membuat pembelajaran lebih menyenangkan. Klik pada menu Edukasi Interaktif di navigation bar, lalu pilih platform yang ingin digunakan melalui dropdown menu yang tersedia. Anda dapat membuat kuis baru atau menggunakan kuis yang sudah ada."
        />

        <DropDownPM
          name="Mengelola Rekomendasi Buku"
          explain="Di menu Rekomendasi Buku, Anda dapat menambahkan buku yang direkomendasikan untuk siswa. Klik tombol 'Tambah Rekomendasi', isi detail buku seperti judul, penulis, dan deskripsi singkat."
        />
        <DropDownPM
          name="Upload Materi Multimedia"
          explain="Materi Multimedia memungkinkan Anda mengunggah berbagai jenis bahan ajar. Anda bisa menambahkan PDF, video, atau audio. Pastikan file yang dimasukkan valid dan dapat diakses.
          Catatan: Setelah mengunggah materi, Anda perlu menunggu konfirmasi admin sebelum materi tersebut tampil dan dapat diakses siswa."
        />
        <DropDownPM
          name="Mengatur Agenda Pribadi"
          explain="Menu Agenda membantu Anda mengorganisir jadwal mengajar. Klik tombol 'Tambah Agenda', isi judul, deskripsi, tanggal, dan waktu. Agenda akan muncul di kalender untuk memudahkan perencanaan."
        />
        <DropDownPM
          name="Berbagi Cerita Lapangan"
          explain="Cerita Lapangan adalah forum untuk berbagi pengalaman mengajar. Klik 'Tambah Cerita', tulis judul dan cerita Anda. Cerita ini dapat dibaca oleh volunteer lain sebagai inspirasi."
        />
      </div>
    </div>
  );
};

export default MainPMSection;
