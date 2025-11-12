import { Eye, Trash2 } from "lucide-react";

const TableActionsUser = ({onView, onDelete}) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        className="text-green-600 hover:text-green-700 transition-colors"
        title="Lihat Detail"
         onClick={onView}
      >
        <Eye size={18} />
      </button>
      <button
            className="text-red-500 hover:text-red-700"
            title="Hapus"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </button>
    </div>
  );
};

export default TableActionsUser;
