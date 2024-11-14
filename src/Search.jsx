import React, { useEffect, useState } from "react";
import Cover from "./backcover.png";
import "./App.css";
import { FiSearch, FiX } from "react-icons/fi";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [locations, setLocations] = useState([]);
	const [error, setError] = useState(null);
	const [filteredLocations, setFilteredLocations] = useState([]);
	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await fetch(
					"https://states-and-cities.com/api/v1/states"
				);
				const data = await response.json();
				setLocations(data);
			} catch (error) {
				setError(error);
			}
		};
		fetchLocations();
	}, []);

	useEffect(() => {
		const filterCountries = () => {
			const filtered = locations.filter((location) =>
				location.name.common.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredLocations(filtered);
		};
		filterCountries();
	}, [searchTerm, locations]);
	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleCancel = () => {
		setSearchTerm("");
	};
	return (
		<>
			<img src={Cover} alt="background" className="cover-image" />
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={handleInputChange}
				/>
				<FiSearch className="search-icon" />
				{searchTerm && (
					<button onClick={handleCancel}>
						<FiX className="cancel-button" />
					</button>
				)}
				<div>
					{filteredLocations.length > 0 && (
						<ul>
							{filteredLocations.map((location) => (
								<li key={location.id}>{location.name}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};

export default Search;
