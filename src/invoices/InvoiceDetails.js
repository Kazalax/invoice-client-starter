import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";


const InvoiceDetails = () => {
     const { id } = useParams();
     const [invoice, setInvoice] = useState({});
     const [seller, setSeller] = useState({}); 
     const [buyer, setBuyer] = useState({});

     useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => {
            setInvoice(data);
            setSeller(data.seller);  
            setBuyer(data.buyer);  
        })
        .catch((err) => {
            console.error(err);
        })
     }, [id]);
     
     return (
        <>
        <div>
            <h1>Detail faktury</h1>
            <hr />
            <h3>{invoice.invoiceNumber}</h3>
            <p>
                <strong>Datum vystavení</strong>
                <br/>
                {invoice.issued}
            </p>
            <p>
                <strong>Datum splatnosti</strong>
                <br />
                {invoice.dueDate}
            </p>
            <p>
                <strong>Název produktu</strong>
                <br/>
                {invoice.product}
            </p>
            <p>
                <strong>Cena produktu</strong>
                <br/>
                {invoice.price}
            </p>
            <p>
                <strong>DPH</strong>
                <br/>
                {invoice.vat}
            </p>
            <p>
                <strong>Prodávající</strong>
                <br/>
                {seller.name}
            </p>
            <p>
                <strong>Kupující</strong>
                <br/>
                {buyer.name}
            </p>
            <p>
                <strong>Poznámka</strong>
                <br/>
                {invoice.note}
            </p>
        </div>
        </>
     );
};

export default InvoiceDetails;