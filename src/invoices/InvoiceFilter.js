import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";
import { apiGet } from "../utils/api";


export const InvoiceFilter = (props) => {
    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    const filter = props.filter;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        
                        <InputField
                            type="text"
                            name="buyerID"
                            handleChange={handleChange}
                            label="Kupující"
                            prompt="nevybrán"
                            value={filter.buyerID ? filter.buyerID : ''}
                        />
                    </div>
                    <div className="col">
                        <InputField
                            type="text"
                            name="sellerID"
                            handleChange={handleChange}
                            label="Prodávající"
                            prompt="nevybrán"
                            value={filter.sellerID ? filter.sellerID : ''}
                        />
                    </div>
                    <div className="col">
                        <InputField
                            type="text"
                            name="product"
                            handleChange={handleChange}
                            label="Produkt"
                            prompt="nevybrán"
                            value={filter.product ? filter.product : ''}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputField
                            type="number"
                            min="0"
                            name="minPrice"
                            handleChange={handleChange}
                            label="Minimální cena"
                            prompt="neuvedena"
                            value={filter.minPrice ? filter.minPrice : ''}
                        />
                    </div>
                    <div className="col">
                        <InputField
                            type="number"
                            min="0"
                            name="maxPrice"
                            handleChange={handleChange}
                            label="Maximální cena"
                            prompt="neuvedena"
                            value={filter.maxPrice ? filter.maxPrice : ''}
                        />
                    </div>
                    <div className="col">
                        <InputField
                            type="number"
                            min="1"
                            name="limit"
                            handleChange={handleChange}
                            label="Limit počtu faktur"
                            prompt="neuveden"
                            value={filter.limit ? filter.limit : ''}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input
                            type="submit"
                            className="btn btn-secondary float-right mt-2"
                            value={props.confirm}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}