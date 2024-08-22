export default function Home() {
  return (
    <main className="flex min-h-screen items-center h-screen justify-between">
      <section className="relative w-4/5 min-h-full h-full bg-red-300">
        <div className="absolute bottom-2 right-2 bg-lime-100 w-32 h-32"></div>
      </section>
      <section className="flex min-h-screen bg-yellow-300 h-full w-1/5"></section>
    </main>
  );
}
