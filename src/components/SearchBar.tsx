import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import fetcher from '@/utils/fetcher';
import { slugify } from '@/utils';
import { searchIcon } from '@/public/images';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

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
                  <a
                    href={`/article/${slugify(result.title)}/${result.id}`}
                    className="block p-2 border-b border-gray-300 hover:bg-gray-100 hover:underline"
                  >
                    <div className="flex">
                      {result.image && (
                        <div className="w-16 h-16 overflow-hidden rounded-md">
                          <Image
                            src={result.image}
                            alt="Search Result Thumbnail"
                            layout="responsive"
                            width={64}
                            height={64}
                          />
                        </div>
                      )}

                      <div className="ml-4 flex flex-col">
                        <p className="text-sm font-semibold text-neural-teal">
                          {result.title}
                        </p>
                        <span className="text-xs text-gray-500">
                          {result.createdAt &&
                            format(parseISO(result.createdAt), 'MMMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </a>
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
