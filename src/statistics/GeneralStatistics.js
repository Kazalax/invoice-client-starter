import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

export const GeneralStatistics = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => {
            setStatistics(data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, []);

    return (
        <>
            <div>
                <h1>Obecné statistiky</h1>
                <hr/>
                <div>
                    <strong>Součet cen za aktualní rok:</strong>
                    <br/>
                    {statistics.currentYearSum?.toLocaleString("cs-CZ")} Kč
                </div>
                <div>
                    <strong>Součet cen za všechny roky:</strong>
                    <br/>
                    {statistics.allTimeSum?.toLocaleString("cs-CZ")} Kč
                </div>
                <div>
                    <strong>Celkový počet faktur:</strong>
                    <br/>
                    {statistics.invoicesCount?.toLocaleString("cs-CZ")}
                </div>
            </div>
        </>
    )
}