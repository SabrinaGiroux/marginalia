import { useRef, useState } from 'react';

import { exportBooks, importBooks, parseAndValidate } from '../lib/file';

import { ConfirmationModal } from '../components/ConfirmationModal';
import { ImportBooksModal } from '../components/ImportBooksModal';

export function SettingsScreen() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showImportModal, setShowImportModal] = useState(false);
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false);

  const [pendingJSON, setPendingJSON] = useState<string | null>(null);
  const [bookCount, setBookCount] = useState(0);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const text = await file.text();

    try {
      const payload = parseAndValidate(text);

      setPendingJSON(text);
      setBookCount(payload.data.books.length);

      setShowImportModal(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to import file');
    }

    // allow re-uploading same file
    e.target.value = '';
  }

  async function handleAddBooks() {
    if (!pendingJSON) return;

    await importBooks(pendingJSON, false);

    setShowImportModal(false);
    setPendingJSON(null);
  }

  async function handleReplaceBooks() {
    if (!pendingJSON) return;

    await importBooks(pendingJSON, true);

    setShowReplaceConfirm(false);
    setShowImportModal(false);

    setPendingJSON(null);
  }

  return (
    <section>
      <div className="flex-1 flex flex-col border rounded-xl p-5 shadow-sm bg-[#1a1a1a] gap-5">
        <h2 className="text-lg font-semibold mb-4">Data</h2>

        <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-xl p-5">
          <h3 className="text-yellow-300 font-semibold mb-2">Local Data Notice</h3>

          <p className="text-yellow-200/80 text-sm">
            Your data is stored locally in your browser. Clearing browser data may delete your
            library. Make sure to export a backup regularly.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Export */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Download a backup of your books and notes.</p>

            <button
              className="w-full border py-2 rounded-md hover:bg-gray-700 transition"
              onClick={exportBooks}
            >
              Export as JSON
            </button>
          </div>

          {/* Import */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Restore your library from a backup file.</p>

            <button
              className="w-full border py-2 rounded-md hover:bg-gray-700 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              Import JSON
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <ImportBooksModal
          bookCount={bookCount}
          onClose={() => setShowImportModal(false)}
          onAdd={handleAddBooks}
          onReplace={() => setShowReplaceConfirm(true)}
        />
      )}

      {/* Confirmation Modal for replacing */}
      {showReplaceConfirm && (
        <ConfirmationModal
          title="Replace Entire Library?"
          message="Are you sure? You'll lose your entire current library."
          confirmText="Yes, Replace Everything"
          cancelText="Cancel"
          danger
          onConfirm={handleReplaceBooks}
          onCancel={() => setShowReplaceConfirm(false)}
        />
      )}
    </section>
  );
}
