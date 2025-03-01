import { TFormValues } from "../Components/LoanCalculator";

export const saveLoansToLocalStorage = (loanData: TFormValues) => {
  const currentSavedCalculations = localStorage.getItem("savedCalculations");

  if (currentSavedCalculations) {
    const currentSavedCalculationsValues = JSON.parse(currentSavedCalculations);

    localStorage.setItem(
      "savedCalculations",
      JSON.stringify([...currentSavedCalculationsValues, loanData])
    );
  } else {
    localStorage.setItem("savedCalculations", JSON.stringify([loanData]));
  }
};
