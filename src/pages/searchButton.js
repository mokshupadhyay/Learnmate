import React, { useState, useEffect } from 'react';
import '../components/SearchButton.css'; // Import CSS file

const SearchButton = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch function passed as a prop
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchSuggestionsFromBackend(searchQuery);
    } else {
      setSuggestions([]); // Clear suggestions if search query is empty
    }
  }, [searchQuery]);

  const fetchSuggestionsFromBackend = async (query) => {
    try {
      const response = await fetch(`http://localhost:3001/api/suggestions?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions.slice(0, 6)); // Limit to top 6 suggestions
      } else {
        console.error('Failed to fetch suggestions:', response.status);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div className="search-bar">
      <form action="/courses/search/" className="search-form">
        <label className="sr-only" htmlFor="search-input">Search for courses</label>
        <div className="search-input-group">
          <input type="hidden" name="src" value="ukw" />
          <input
            type="text"
            id="search-input"
            name="q"
            placeholder="Search Courses  .  .  ."
            autoComplete="off"
            aria-label="Search"
            className="search-input"
            value={searchQuery}
            onChange={handleChange}
          />
          <button type="submit" className="search-button" disabled>
            <svg aria-hidden="true" focusable="false" className="search-icon">
              <use xlinkHref="#icon-search"></use>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchButton;
