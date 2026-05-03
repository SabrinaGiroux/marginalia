export function SettingsScreen() {
  return (
    <section className="flex flex-col lg:flex-row lg:h-[85vh] p-5 gap-5">
      <div>
        <button> Import Books</button>
        <button> Export Books</button>
      </div>
      <div className="flex flex-col">
        <h3> Warning! </h3>
        <p>
          Your data is stored locally in your browser. Clearing browser data may delete the books
          from your library.{' '}
        </p>
      </div>
    </section>
  );
}
