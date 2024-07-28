import React, { useState } from 'react';

interface FilterBarProps {
    onNameFilterChange: (name: string) => void;
    onCityFilterChange: (city: string) => void;
    cities: string[];
    onHighlightChange: (highlight: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onNameFilterChange, onCityFilterChange, cities, onHighlightChange }) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [highlight, setHighlight] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        onNameFilterChange(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCity(e.target.value);
        onCityFilterChange(e.target.value);
    };

    const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHighlight(e.target.checked);
        onHighlightChange(e.target.checked);
    };

    return (
        <div>
             <div className="filter-bar">
                <p>Name</p> <br />
            <input type="text" value={name} onChange={handleNameChange} />
            
            <p>city</p><br/>
            <select value={city} onChange={handleCityChange}>
                <option value="">Select city</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}
            </select>
            <label>
                Highlight oldest per city
                <input type="checkbox" checked={highlight} onChange={handleHighlightChange} />
            </label>
        </div>
        </div>
    );
};

export default FilterBar;
