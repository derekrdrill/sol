import { AdvocatesRoot } from './components';

async function fetchAdvocates() {
  const apiUrl = process.env.API_URL || 'http://localhost:3000';

  const response = await fetch(`${apiUrl}/api/advocates`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: 'Failed to fetch advocates' }));
    throw new Error(errorData.error || 'Failed to load advocates');
  }

  const { data } = await response.json();
  return data || [];
}

async function Root() {
  const advocates = await fetchAdvocates();
  return <AdvocatesRoot initialAdvocates={advocates} />;
}

export default Root;
