import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import fetcher from '@/utils/fetcher';
import { searchIcon } from '@/public/images';
import Image from 'next/image';
import SmallNewsCard from './SmallNewsCard';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceComplete, setDebounceComplete] = useState(false);
  const searchContainerRef = useRef(null);

  const apiUrl = `/api/newsArticles/searchNewsArticles?q=${encodeURIComponent(
    searchTerm,
  )}`;

  const { data: searchResults, error } = useSWR(
    searchTerm && debounceComplete ? apiUrl : null,
    fetcher,
  );

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setDebounceComplete(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickOutside = (e) => {
    console.log('e ', e);
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setSearchTerm('');
    }
  };

  const delayedSearch = debounce(() => {
    setDebounceComplete(true);
  }, 1000);

  useEffect(() => {
    delayedSearch();
    return () => delayedSearch.cancel();
  }, [searchTerm, delayedSearch]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef}>
      <form
        onSubmit={handleSearchSubmit}
        className="w-full lg:w-auto lg:ml-4 mt-4 lg:mt-0"
      >
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              handleSearchChange(e);
            }}
            className="p-2 pl-10 pr-8 rounded border-none bg-white w-full lg:w-80 sm:w-64"
          />
          <div className="absolute pl-2">
            <Image src={searchIcon} alt="Search Icon" width={20} height={20} />
          </div>
        </div>

        {searchResults && debounceComplete && (
          <div className="absolute mt-2 lg:w-80 sm:w-64 bg-white border rounded shadow-md overflow-hidden">
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>
                  <SmallNewsCard news={result} search />
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <div>Error fetching search results</div>}
      </form>
    </div>
  );
};

export default SearchBar;
