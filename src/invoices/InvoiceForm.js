import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";



const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: 0,
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: "",
        seller: "",
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [personListState, setPersonList] = useState([]);
    

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice(data);
                setBuyer(data.buyer);
                setSeller(data.seller);
            });
        }
    }, [id]);

    useEffect(() => {
        apiGet('/api/persons')
        .then(data => {
            setPersonList(data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Invoice before submission:", invoice);

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setInvoice(data);
                console.log("Response from server:", data);
                setSent(true);
                setSuccess(true);
                navigate("/invoices");

            })
            .catch((error) => {
                console.error("Error submitting:", error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const handleChangeSeller = (e) => {
        const selectedSellerId = e.target.value;
        const selectedSeller = personListState.find(person => person._id == selectedSellerId);
        
        setInvoice(prevInvoice => ({ ...prevInvoice, seller: selectedSeller }));
        console.log("Updated seller:", selectedSeller);
    };
    
    const handleChangeBuyer = (e) => {
        const selectedBuyerId = e.target.value;
        const selectedBuyer = personListState.find(person => person._id == selectedBuyerId);
        
        setInvoice(prevInvoice => ({ ...prevInvoice, buyer: selectedBuyer }));
        console.log("Updated buyer:", selectedBuyer);
        console.log('selectedBuyerId:', selectedBuyerId);
        console.log('personListState:', personListState);
    };
    

const sent = sentState;
const success = successState;

return (
    <div>
        <h1>{id ? "Upravit" : "Vytvořit"} faktura</h1>
        <hr />
        {errorState ? (
            <div className="alert alert-danger">{errorState}</div>
        ) : null}
        {sent && (
            <FlashMessage
                theme={success ? "success" : ""}
                text={success ? "Uložení faktury proběhlo úspěšně" : ""}
            />
        )}

        <form onSubmit={handleSubmit}>
            <InputField
                required={true}
                type="number"
                name="invoiceNumber"
                min="3"
                label="Číslo faktury"
                prompt="Zadejte číslo faktury"
                value={invoice.invoiceNumber}
                handleChange={(e) => {
                    setInvoice({ ...invoice, invoiceNumber: e.target.value });
                }}
            />
            <InputField
                required={true}
                type="date"
                name="issued"
                min="3"
                label="Datum vystavení"
                prompt="Zadejte datum vystavení faktury"
                value={invoice.issued}
                handleChange={(e) => {
                    setInvoice({ ...invoice, issued: e.target.value });
                }}
            />
            <InputField
                required={true}
                type="date"
                name="dueDate"
                min="3"
                label="Datum splatnosti"
                prompt="Zadejte datum splatnosti faktury"
                value={invoice.dueDate}
                handleChange={(e) => {
                    setInvoice({ ...invoice, dueDate: e.target.value });
                }}
            />
            <InputField
                required={true}
                type="text"
                name="product"
                min="3"
                label="Název produktu"
                prompt="Zadejte název produktu"
                value={invoice.product}
                handleChange={(e) => {
                    setInvoice({ ...invoice, product: e.target.value });
                }}
            />
            <InputField
                required={true}
                type="number"
                name="price"
                min="1"
                label="Cena"
                prompt="Zadejte cenu"
                value={invoice.price}
                handleChange={(e) => {
                    setInvoice({ ...invoice, price: e.target.value });
                }}
            />
            <InputField
                required={true}
                type="number"
                name="vat"
                min="1"
                label="DPH"
                prompt="Zadejte DPH"
                value={invoice.vat}
                handleChange={(e) => {
                    setInvoice({ ...invoice, vat: e.target.value });
                }}
            />
            <InputField
                required={true}
                type="text"
                name="note"
                label="Poznámka"
                value={invoice.note}
                handleChange={(e) => {
                    setInvoice({ ...invoice, note: e.target.value });
                }}
            />
            <InputSelect
                label="Prodávající"
                name="seller"
                handleChange={handleChangeSeller}
                value={invoice.seller?._id}
                items={personListState}
                prompt="Vyberte prodávajícího"
            />

            <InputSelect
                label="Kupující"
                name="buyer"
                handleChange={handleChangeBuyer}
                value={invoice.buyer?._id}
                items={personListState}
                prompt="Vyberte kupujícího"

            />

            <input type="submit" className="btn btn-primary" value="Uložit" />
        </form>
    </div>
);
};
export default InvoiceForm;