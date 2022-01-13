import { useState } from "react";

function useContractorsFilter() {
    const [showByCompanyName, setShowByCompanyName] = useState("");
    const [showByNIP, setShowByNIP] = useState("");
    const [showByCity, setShowByCity] = useState("");

    return {
        showByCompanyName, setShowByCompanyName,
        showByNIP, setShowByNIP,
        showByCity, setShowByCity
    }
}

export default useContractorsFilter;