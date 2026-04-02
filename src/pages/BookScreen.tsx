import { useParams } from 'react-router';

export function BookScreen() {
  const { id } = useParams();
  return (
    <>
      <section id="center">
        <h1> Marginalia - Book Detail screen for book with id: {id}</h1>
      </section>
    </>
  );
}
