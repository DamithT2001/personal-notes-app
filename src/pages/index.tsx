import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Personal Notes App</title>
        <meta name="description" content="A simple note-taking app built with Next.js" />
      </Head>
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Personal Notes App</h1>
        <p className="text-center mt-4 text-gray-600">Let's start building something awesome 🚀</p>
      </main>
    </>
  );
}
