import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import fetcher from '@/utils/fetcher';
import { searchIcon } from '@/public/images';
import Image from 'next/image';
import SmallNewsCard from './SmallNewsCard';
interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
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
    <div ref={searchContainerRef} className={`px-3 py-2 ${className}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="w-full lg:w-auto lg:ml-4 mt-4 lg:mt-0"
        role="search"
      >
        <div className="flex items-center">
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <input
            id="searchInput"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              handleSearchChange(e);
            }}
            className="bg-off-white text-gray p-2 pl-10 pr-8 rounded-full border-none w-full lg:w-70 sm:w-64"
          />
          <button type="submit" className="absolute pl-2">
            <Image
              src={searchIcon}
              alt="Search Icon"
              width={20}
              height={20}
              unoptimized
              loading="lazy"
              aria-label="Search Icon"
            />
          </button>
        </div>

        {searchResults && debounceComplete && (
          <div className="absolute mt-2 lg:w-70 sm:w-64 max-h-60 overflow-y-auto border rounded shadow-md bg-off-white">
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
