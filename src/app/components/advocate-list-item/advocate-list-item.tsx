import type { Advocate } from '../../../types';

interface AdvocateListItemProps {
  advocate: Advocate;
}

function AdvocateListItem({ advocate }: AdvocateListItemProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <div className='flex items-center gap-4 mb-3'>
            <h3 className='text-xl font-semibold text-gray-900'>
              {advocate.firstName} {advocate.lastName}
            </h3>
            <span className='text-sm text-gray-600'>{advocate.degree}</span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700'>
            <div>
              <span className='font-medium'>Location:</span>{' '}
              <span>{advocate.city}</span>
            </div>
            <div>
              <span className='font-medium'>Experience:</span>{' '}
              <span>{advocate.yearsOfExperience} years</span>
            </div>
            <div>
              <span className='font-medium'>Phone:</span>{' '}
              <span>{advocate.phoneNumber}</span>
            </div>
          </div>

          {advocate.specialties.length > 0 && (
            <div className='mt-4'>
              <p className='text-sm font-medium text-gray-700 mb-2'>
                Specialties:
              </p>
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
      </div>
    </div>
  );
}

export default AdvocateListItem;
