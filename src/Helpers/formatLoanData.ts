import dayjs from "dayjs";
import { TFormValues } from "../Components/LoanCalculator";

export const formatLoanData = ({
  startDate,
  endDate,
  amount,
  rate,
  margin,
}: TFormValues) => {
  const ratePercentage = rate! / 100;

  const totalInterestRate = rate! + margin!;
  const totalInterestRatePercentage = totalInterestRate / 100;

  // Day JS, the date library, must be endDate - startDate to ensure a positive number.
  // This is only true assuming the end date is always after the start date, enforced in the form validation.
  const loanTermInDays = endDate.diff(startDate, "days");

  // Daily Interest Amount without margin
  const dailyInterestAccruedWithoutMargin = amount! * ratePercentage;

  // Daily Interest Amount Accrued
  const dailyInterestAccrued = amount! * totalInterestRatePercentage;

  // Number of Days elapsed since the Start Date of the loan
  const currentDate = dayjs();
  const elapsedDays = currentDate.diff(startDate, "days");

  // Total Interest - calculated over the given period
  const totalInterest = amount! * totalInterestRatePercentage * loanTermInDays;

  const loanData = {
    totalInterest,
    elapsedDays,
    loanTermInDays,
    dailyInterestAccruedWithoutMargin,
    dailyInterestAccrued,
    accrualDate: startDate,
  };

  return loanData;
};
