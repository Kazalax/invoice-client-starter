import React, { useEffect, useState } from "react";

import { apiDelete, apiGet } from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import { InvoiceFilter } from "./InvoiceFilter";


const InvoiceIndex = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [buyerListState, setBuyerList] = useState([]);
    const [productListState, setProductList] = useState([]);
    const [filterState, setFilter] = useState({
        buyerID: undefined,
        sellerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined
    });



    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
            setInvoices(invoices.filter((item) => item._id !== id));
            setFilteredInvoices(filteredInvoices.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };



    useEffect(() => {
        apiGet("/api/invoices").then((data) => {
            setInvoices(data);
            setFilteredInvoices(data)
        });
        apiGet("/api/persons").then((data) => {
            setPersons(data)
        });
    }, []);

    const handleChange = (e) => {
        setFilter(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value === '' ? undefined : e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Apply each filter to the full invoices list
        let results = [...invoices];

        console.log("Filter state:", filterState);
        console.log("Invoice structure:", invoices[0]);
        
        if (filterState.buyerID) {
            results = results.filter(invoice =>
                invoice.buyer?.name.toLowerCase().includes(filterState.buyerID.toLowerCase())
            );
        }
        if (filterState.sellerID) {
            results = results.filter(invoice =>
                invoice.seller?.name.toLowerCase().includes(filterState.sellerID.toLowerCase())
            );
        }
        if (filterState.product) {
            results = results.filter(invoice =>
                invoice.product.toLowerCase().includes(filterState.product.toLowerCase())
            );
        }
        if (filterState.minPrice) {
            results = results.filter(invoice => invoice.price >= Number(filterState.minPrice));
        }
        if (filterState.maxPrice) {
            results = results.filter(invoice => invoice.price <= Number(filterState.maxPrice));
        }
        if (filterState.limit) {
            results = results.slice(0, Number(filterState.limit));
        }

        setFilteredInvoices(results); 
    };
    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />

            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                filter={filterState}
                confirm="Filtrovat faktury"
            />
            <hr />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={filteredInvoices}
                label="Počet faktur:"
            />
        </div>
    );
};
export default InvoiceIndex;