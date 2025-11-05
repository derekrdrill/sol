'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  return (
    <main className='container mx-auto px-6 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Solace Advocates</h1>
      <p className='text-red-600 mb-4'>Error: {error.message}</p>
      <button
        onClick={reset}
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Try again
      </button>
    </main>
  );
}

export default Error;
