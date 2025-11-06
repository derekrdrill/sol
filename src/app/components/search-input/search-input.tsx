interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  isLoading = false,
}: SearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className='relative flex gap-2'>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}

export default SearchInput;
