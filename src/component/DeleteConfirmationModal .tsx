import Icons from "../assets/Icons";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <img src={Icons.deleteIcon} alt="Delete" className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-semibold text-[#1F2937] mb-3">
            Delete Practice Logo?
          </h3>
          <p className="text-[#6B7280] text-[15px] leading-relaxed">
            This action cannot be undone. The logo will be permanently removed 
            from your practice profile and all future communications.
          </p>
        </div>

        <div className="border-t border-gray-200 text-[12px] p-5 flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 h-14 rounded-xl border border-gray-300 font-semibold text-[#1F2937] hover:bg-gray-50 transition cursor-pointer disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-14 rounded-xl bg-[#CA2044] font-semibold text-white hover:bg-red-700 transition disabled:opacity-70 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete Logo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;