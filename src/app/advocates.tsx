'use client';

import { useState } from 'react';
import type { Advocate } from './types';

interface AdvocatesListProps {
  initialAdvocates: Advocate[];
}

function Advocates({ initialAdvocates }: AdvocatesListProps) {
  const [filteredAdvocates, setFilteredAdvocates] =
    useState<Advocate[]>(initialAdvocates);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchTermElement = document.getElementById('search-term');
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }

    const filtered = initialAdvocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    setFilteredAdvocates(initialAdvocates);
  };

  return (
    <main style={{ margin: '24px' }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id='search-term'></span>
        </p>
        <input style={{ border: '1px solid black' }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s: string) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Advocates;
