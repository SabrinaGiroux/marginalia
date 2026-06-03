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
          card
          border
          ${danger ? 'border-red-900' : 'border-[#2a2a2a]'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">{title}</h2>

          <p className="text-sm ">{message}</p>

          {danger && <p className="text-sm text-red-500">This action cannot be undone.</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="
              btn-primary
            "
          >
            {cancelText}
          </button>

          <button onClick={onConfirm} className="btn-secondary">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
