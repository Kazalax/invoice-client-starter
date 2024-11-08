import { GeneralStatistics } from "./GeneralStatistics";
import { apiGet } from "../utils/api";
import { CompanyStatistics } from "./CompanyStatistics";
import { useEffect, useState } from "react";


const StatisticsIndex = () => {
    const [persons, setPersons] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => {
            const personsWithIndex = data.map((person, index) => ({
                ...person,
                originalIndex: index + 1,
            }));
            setPersons(personsWithIndex);
        });
    }, []);

    const filteredPersons = persons.filter(person =>
        person.personName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <GeneralStatistics />
            <hr />

            <CompanyStatistics
                items={filteredPersons}
                label={`Počet osob: ${filteredPersons.length}`}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </div>
    );
};


export default StatisticsIndex;