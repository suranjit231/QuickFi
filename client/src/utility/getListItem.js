function getListItems(activeLink) {
    let lists = [];

    switch (activeLink) {
        case "applyNow":
            return lists = [
                "Start Application", "Quick Loan Application",
                "Document Upload", "Application Status"
            ];

        case "loanTypes":
            return lists = [
                "Personal Loan", "Home Loan", 
                "Auto Loan", "Business Loan"
            ];

        case "calculators":
            return lists = [
                "EMI Calculator", "Loan Eligibility Calculator",
                "Interest Rate Comparison"
            ];

        case "resources":
            return lists = [
                "Loan Guides", "FAQs",
                "Support Center", "Contact Us"
            ];

        default:
            return lists = [];
    }
}

export default getListItems;
