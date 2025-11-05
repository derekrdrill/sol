import { getAdvocates } from '../db';
import { AdvocatesRoot } from './components';

export default async function Home() {
  const result = await getAdvocates();

  if (!result.success) {
    return (
      <main className='container mx-auto px-6 py-8'>
        <h1 className='text-3xl font-bold mb-4'>Solace Advocates</h1>
        <p className='text-red-600'>Error: {result.error}</p>
      </main>
    );
  }

  const advocates = result.data || [];

  return <AdvocatesRoot initialAdvocates={advocates} />;
}
