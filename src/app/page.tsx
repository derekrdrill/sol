import { getAdvocates } from '../db';
import Advocates from './advocates';

export default async function Home() {
  const result = await getAdvocates();

  if (!result.success) {
    return (
      <main style={{ margin: '24px' }}>
        <h1>Solace Advocates</h1>
        <p>Error: {result.error}</p>
      </main>
    );
  }

  const advocates = result.data || [];

  return <Advocates initialAdvocates={advocates} />;
}
