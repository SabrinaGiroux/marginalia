import { exportBooks } from '../lib/file';

export function SettingsScreen() {
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
            <button className="w-full border py-2 rounded-md hover:bg-gray-700  transition">
              Import JSON
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
