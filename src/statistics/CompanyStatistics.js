import React from "react"
import { Searchbar } from "../components/SearchBar"

export const CompanyStatistics = ({ label, items, searchQuery, setSearchQuery }) => {

    return (
        <div>
            <h1>Statistiky osob:</h1>
            <p>
                {label}
            </p>
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Vyhledat osobu"
            />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th>Příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.personName}</td>
                            <td>{item.revenue?.toLocaleString("cs-CZ")} Kč</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}