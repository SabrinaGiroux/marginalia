type ConfirmationModalProps = {
  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => void;
  onCancel: () => void;

  danger?: boolean;
};

export function ConfirmationModal({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmationModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className={`
          w-full max-w-md rounded-xl p-6 flex flex-col gap-5
          bg-[#1a1a1a]
          border
          ${danger ? 'border-red-900' : 'border-[#2a2a2a]'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-white">{title}</h2>

          <p className="text-sm text-zinc-400">{message}</p>

          {danger && <p className="text-sm text-red-400">This action cannot be undone.</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-md
              bg-zinc-800 text-white
              hover:bg-zinc-700
              transition
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`
              px-4 py-2 rounded-md text-white transition
              ${danger ? 'bg-red-700 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-500'}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
