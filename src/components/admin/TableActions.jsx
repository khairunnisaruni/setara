import { Eye, Trash2, CheckCircle, XCircle, Pencil } from "lucide-react";

const TableActions = ({ 
  activeTab, 
  onView, 
  onApprove, 
  onReject, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="flex justify-center gap-3">
      <button
        className="text-blue-500 hover:text-blue-700"
        title="Lihat"
        onClick={onView}
      >
        <Eye size={18} />
      </button>

      {activeTab === "daftar" ? (
        <>
          <button
            className="text-amber-500 hover:text-amber-700"
            title="Edit"
            onClick={onEdit}
          >
            <Pencil size={18} />
          </button>

          <button
            className="text-red-500 hover:text-red-700"
            title="Hapus"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </button>
        </>
      ) : (
        <>
          <button
            className="text-green-500 hover:text-green-700"
            title="Setujui"
            onClick={onApprove}
          >
            <CheckCircle size={18} />
          </button>

          <button
            className="text-red-500 hover:text-red-700"
            title="Tolak"
            onClick={onReject}
          >
            <XCircle size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default TableActions;
