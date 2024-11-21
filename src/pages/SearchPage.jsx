import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Cards } from '../components/Cards';
import { useMovieAuth } from '../context/MovieAuth';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getMediaUrl } = useMovieAuth(); 

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const response = await axios.get("/search/multi", {
          params: {
            query: query,
            language: "en-US",
            page: 1,
          },
        });
        setSearchResults(response.data.results);
        setError(null);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to search movies');
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  if (loading) return <div className="pt-20 text-white">Searching...</div>;
  if (error) return <div className="pt-20 text-white">{error}</div>;
  if (!query) return <div className="pt-20 text-white">Enter a search term</div>;

  return (
    <div className="container mx-[10px] w-full">
      <h1 className="text-white lg:text-3xl font-bold pt-20 pb-6">
        Search Results for: {query}
      </h1>

      {searchResults.length === 0 ? (
        <div className="text-white">No results found</div>
      ) : (
        <div className="grid lg:w-[230px] md:w-[180px] w-[40px] gap-x-[175px] lg:gap-x-[250px] grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2">
          {searchResults.map((item) => {
            const mediaUrl = getMediaUrl(item)
            return (
              <div key={item.id}>
                <Cards data={item} media_type={mediaUrl} />
              </div>
            );
          }
          )}
        </div>
      )}
    </div>
  );
};
