import React from "react";
import FilterSearchBar from "../../components/referensi_aksi/FilterSearchBar";

const HeaderMap = () => {
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">

        {/* Custom Icon */}
        <span className="inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M29.5626 29.3999L27.9439 32.4436L35.8693 31.1479C34.2699 30.3457 32.1048 29.7724 29.5626 29.3999ZM9.14637 30.0635C5.47556 31.0316 3.15002 32.6179 3.15002 34.9741C3.15154 35.4814 3.26242 35.9824 3.4751 36.4429L16.1948 34.3639L9.14637 30.0635ZM38.5518 33.5999L20.8488 36.4853L25.5175 41.7966C33.1842 41.1099 38.85 38.6609 38.85 34.9741C38.85 34.4827 38.7442 34.0258 38.5518 33.5999ZM17.8576 36.9834L5.89598 38.9385C9.05775 40.897 14.6383 41.9999 21 41.9999C21.3856 41.9999 21.7623 41.989 22.142 41.981L17.8576 36.9834Z" fill="#FFB54D"/>
            <path d="M21.0008 0C14.1548 0 8.53772 5.59986 8.53772 12.4303C8.53772 15.0562 9.37226 17.5022 10.7814 19.5136L18.8596 33.4786L18.8941 33.5236C19.2129 33.9398 19.5241 34.2682 19.8895 34.5097C20.2549 34.7516 20.7085 34.8961 21.1537 34.8516C22.0432 34.7626 22.588 34.1342 23.105 33.4337L23.1327 33.3976L32.051 18.2183L32.056 18.2087C32.2652 17.8307 32.4198 17.446 32.5508 17.0713C33.1518 15.5978 33.4613 14.0217 33.4622 12.4303C33.4622 5.59986 27.8468 0 21.0008 0ZM21.0008 7.1589C23.9706 7.1589 26.2886 9.47268 26.2886 12.4299C26.2886 15.388 23.9706 17.7009 21.0008 17.7009C18.0306 17.7009 15.7113 15.3875 15.7113 12.4299C15.7113 9.4731 18.031 7.1589 21.0008 7.1589Z" fill="#FFB54D"/>
          </svg>
        </span>

        {/* Title Text */}
        Peta <span className="text-[#FF9500]">Persebaran Sekolah</span>
      </h1>

      {/* Search + Filter Combined */}
      <FilterSearchBar />

      {/* Description */}
      <p className="text-black font-medium mt-3">
        Temukan Sekolah. Wujudkan Aksi Nyata.
      </p>

      <p className="text-gray-600 mt-1">
        Lihat area yang membutuhkan dukungan, dan jadilah bagian dari gerakan pendidikan setara.
      </p>
    </>
  );
};

export default HeaderMap;
