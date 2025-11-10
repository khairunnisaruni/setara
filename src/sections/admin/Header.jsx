import { LogOut } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-end items-center px-6 py-3 bg-white border-b border-gray-200 shadow-sm">

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium text-gray-800 leading-tight">Admin</p>
          <p className="text-xs text-gray-500">admin@setara.id</p>
        </div>

        {/* Profile Circle */}
        <div className="relative">
          <div className="bg-linear-to-br from-amber-500 to-green-700 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold shadow-sm">
            A
          </div>
        </div>

        
      </div>
    </header>
  );
};

export default Header;
