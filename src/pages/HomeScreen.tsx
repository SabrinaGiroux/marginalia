import { BookList } from '../components/BookList';



export function HomeScreen() {
  return (
    <>
      <section className="flex flex-col items-center justify-start py-10 gap-7">
        <h2 className="text-2xl text-gray-300"> Your Books </h2>
        <BookList books={[]} />
      </section>
    </>
  );
}
