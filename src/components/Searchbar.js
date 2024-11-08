import React from "react";

export const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Vyhledávání..." }) => {
    return (
        <input
            class="form-control form-control-md w-25"
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
    );
};