import '../App.css';
import { FaHome, FaSearch, FaSort, FaCog } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Search Term:', searchTerm);
    };

    return (
        <div className="Nav">
            <li className="nav-item">
                <FaHome className="icon" /> Home
            </li>
            <li className="nav-item">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <FaSearch className="icon" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className="search-input" 
                    />
                </form>
            </li>
            <li className="nav-item">
                <FaSort className="icon" /> Sort By
            </li>
            <li className="nav-item">
            <FaCog className="icon" /> Settings
            </li>
        </div>
    );
};

export default Header;
