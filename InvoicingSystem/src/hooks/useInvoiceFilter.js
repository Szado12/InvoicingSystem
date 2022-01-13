import { useState } from "react";

function useInvoiceFilter() {
    const [showByInvoiceNumber, setShowByInvoiceNumber] = useState("");
    const [showByContractorName, setShowByContractorName] = useState("");
    const [showByCreateDate, setShowByCreateDate] = useState([null,null]);
    const [showByModifyDate, setShowByModifyDate] = useState([null,null]);

    return {
        showByInvoiceNumber,
        setShowByInvoiceNumber,
        showByContractorName,
        setShowByContractorName,
        showByCreateDate,
        setShowByCreateDate,
        showByModifyDate,
        setShowByModifyDate
    }
}

export default useInvoiceFilter;