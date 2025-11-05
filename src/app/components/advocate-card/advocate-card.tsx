import type { Advocate } from '../../../types';

interface AdvocateCardProps {
  advocate: Advocate;
}

function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
      <div className='mb-4'>
        <h3 className='text-xl font-semibold text-gray-900'>
          {advocate.firstName} {advocate.lastName}
        </h3>
        <p className='text-sm text-gray-600 mt-1'>{advocate.degree}</p>
      </div>

      <div className='space-y-2 text-sm text-gray-700'>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Location:</span>
          <span>{advocate.city}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Experience:</span>
          <span>{advocate.yearsOfExperience} years</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Phone:</span>
          <span>{advocate.phoneNumber}</span>
        </div>
      </div>

      {advocate.specialties.length > 0 && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <p className='text-sm font-medium text-gray-700 mb-2'>Specialties:</p>
          <div className='flex flex-wrap gap-2'>
            {advocate.specialties.map((specialty) => (
              <span
                key={specialty}
                className='px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded'
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvocateCard;
