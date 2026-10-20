function paragraphize(text) {
    const p = document.createElement("p");
    const textNode = document.createTextNode(text);
    p.appendChild(textNode);
    return p;
}

function calcMonthlyPayment(loanAmount, termYears, interestRate) {
    const monthlyPayment = (
        ((interestRate / 12) * loanAmount) / (1 - Math.pow(1 + (interestRate / 12), (termYears * -12)))
    ).toFixed(2); 
    return +monthlyPayment;
} 

function calcTotalInterest(monthlyPayment, termYears, loanAmount) {
    return +((monthlyPayment * termYears * 12 ) - loanAmount).toFixed(2);
}

calcButton = document.getElementById("Button1");
calcButton.addEventListener("click",
                            function() {
                                const displayDiv = document.getElementById("display");
                                const interestRate = .0575;
                                const loanAmount = +window.prompt("Enter loan amount (without commas): ");
                                // Clear out old results if button is pressed again
                                while (displayDiv.childNodes.length > 0) {
                                    displayDiv.removeChild(displayDiv.firstChild);
                                }
                                let termYears = +window.prompt("Enter loan term in years (must be 30 or 15): ");
                                // Validate termYears input
                                while (termYears !== 30 && termYears !== 15) {
                                    window.alert("Loan term must be 30 or 15 years.");
                                    termYears = +window.prompt("Enter loan term in years (must be 30 or 15): ");
                                }
                                const monthlyPayment = calcMonthlyPayment(loanAmount, termYears, interestRate);
                                const totalInterest = calcTotalInterest(monthlyPayment, termYears, loanAmount);
                                const mortgageTotal = loanAmount + totalInterest;
                                // Create paragraph elements
                                const monthlyPaymentP = paragraphize("Monthly payment: $" + monthlyPayment);
                                const termP = paragraphize("Mortgate term (years): " + termYears);
                                const rateP = paragraphize("Interest rate: " + (interestRate * 100) + "%");
                                const loanAmountP = paragraphize("Loan amount: $" + loanAmount.toFixed(2));
                                const totalInterestP = paragraphize("Total interest due: $" + totalInterest.toFixed(2))
                                const mortgageTotalP = paragraphize("Total mortgage cost: $" + mortgageTotal.toFixed(2));
                                const monthlyPaymentsHeader = paragraphize("Monthly Payments: ");

                                // Append paragraph elements to display div
                                displayDiv.appendChild(termP);
                                displayDiv.appendChild(rateP);
                                displayDiv.appendChild(loanAmountP);
                                displayDiv.appendChild(monthlyPaymentP);
                                displayDiv.appendChild(totalInterestP);
                                displayDiv.appendChild(mortgageTotalP);
                                displayDiv.appendChild(monthlyPaymentsHeader);

                                // Monthly Breakdown
                                let month = 0;
                                let remainingBalance = mortgageTotal;
                                while (remainingBalance > 0) {
                                    let paymentAmount;
                                    month++;
                                    if (remainingBalance > monthlyPayment) {
                                        paymentAmount = monthlyPayment;
                                    } else {
                                        paymentAmount = remainingBalance;
                                    }
                                    remainingBalance -= paymentAmount;
                                    // Round to 2 decimal places to avoid floating point errors, then cast back to Number
                                    remainingBalance = +remainingBalance.toFixed(2);
                                    monthInfoP = paragraphize(
                                        "Month Number " + month + " Payment: $" + paymentAmount + " Remaining Balance: $" + remainingBalance
                                    );
                                    displayDiv.appendChild(monthInfoP);
                                }
                                // Explicitly checking in case something goes wrong and we end the loop before reaching 0.
                                if (remainingBalance === 0) {
                                    const finalP = paragraphize("Ending Amortization Calculator...");
                                    displayDiv.appendChild(finalP);
                                }
                            });