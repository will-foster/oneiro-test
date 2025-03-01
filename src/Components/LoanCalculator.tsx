import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./LoanCalculator.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { formatLoanData } from "../Helpers/formatLoanData";
import { saveLoansToLocalStorage } from "../Helpers/saveLoansToLocalStorage";
import { formatCurrency } from "../Helpers/formatCurrency";

export type TFormValues = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  amount: number | null;
  currency: string;
  rate: number | null;
  margin: number | null;
};

type TFormattedLoanData = ReturnType<typeof formatLoanData>;

export const LoanCalculator = () => {
  const [loanData, setLoanData] = useState<TFormattedLoanData | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<TFormValues[]>([]);

  useEffect(() => {
    const savedCalculations = localStorage.getItem("savedCalculations");
    if (savedCalculations) {
      setSavedCalculations(JSON.parse(savedCalculations));
    }
  }, [loanData]);

  const formik = useFormik({
    initialValues: {
      startDate: dayjs(),
      endDate: dayjs().add(1, "day"),
      amount: null,
      currency: "GBP",
      rate: null,
      margin: null,
    },
    onSubmit: (values: TFormValues) => {
      saveLoansToLocalStorage(values);
      setLoanData(formatLoanData(values));
    },
  });

  return (
    <main className={styles.container}>
      <h1>Loan Calculator</h1>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <DatePicker
          label="Start Date"
          name="startDate"
          value={formik.values.startDate}
          onChange={(value) => formik.setFieldValue("startDate", value)}
        />

        <DatePicker
          label="End Date"
          name="endDate"
          value={formik.values.endDate}
          onChange={(value) => formik.setFieldValue("endDate", value)}
        />

        <TextField
          label="Loan Amount"
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          required
        />

        <FormControl>
          <InputLabel id="currencySelectLabel">Currency</InputLabel>
          <Select
            labelId="currencySelectLabel"
            id="currencySelect"
            label="Currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            required
          >
            <MenuItem value={"GBP"}>GBP</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Base Interest Rate (%)"
          type="number"
          name="rate"
          value={formik.values.rate}
          onChange={formik.handleChange}
          required
        />

        <TextField
          label="Margin (%)"
          type="number"
          name="margin"
          value={formik.values.margin}
          onChange={formik.handleChange}
          required
        />

        <Button variant="contained" type="submit">
          Calculate Loan
        </Button>
      </form>

      <div className={styles.loanDisplay}>
        <LoanSchedule loanData={loanData} />

        {savedCalculations.length > 0 && (
          <div className={styles.savedCalculations}>
            <h2>Saved Calculations</h2>

            {savedCalculations.map((calc, index) => (
              <SavedCalculation
                calc={calc}
                key={index + calc.amount!}
                setLoanData={setLoanData}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

const LoanSchedule = ({
  loanData,
}: {
  loanData: TFormattedLoanData | null;
}) => {
  if (!loanData) {
    return (
      <div className={styles.loanSchedulePending}>
        <span>Fill out the form above or load a saved loan</span>
      </div>
    );
  }

  return (
    <div className={styles.loanSchedule}>
      <h2>Loan Schedule</h2>

      <p>
        <strong>Total interest:</strong>{" "}
        {formatCurrency(loanData.totalInterest)}
      </p>
      <p>
        <strong>Elapsed days since start of loan:</strong>{" "}
        {loanData.elapsedDays} days
      </p>
      <p>
        <strong>Loan length in days:</strong> {loanData.loanTermInDays} days
      </p>
      <p>
        <strong>Daily interest accrued (without margin):</strong>{" "}
        {formatCurrency(loanData.dailyInterestAccruedWithoutMargin)}
      </p>
      <p>
        <strong>Daily interest accrued:</strong>{" "}
        {formatCurrency(loanData.dailyInterestAccrued)}
      </p>
      <p>
        <strong>Accrual Date:</strong>{" "}
        {loanData.accrualDate.format("DD/MM/YYYY")}
      </p>
    </div>
  );
};

const SavedCalculation = ({
  calc,
  setLoanData,
}: {
  calc: TFormValues;
  setLoanData: (arg: TFormattedLoanData) => void;
}) => {
  const startDate = dayjs(calc.startDate);
  const endDate = dayjs(calc.endDate);
  return (
    <Card>
      <CardContent className={styles.savedCalculation}>
        <p>
          <strong>Start Date:</strong> {startDate.format("DD/MM/YYYY")}
        </p>
        <p>
          <strong>End Date:</strong> {endDate.format("DD/MM/YYYY")}
        </p>
        <p>
          <strong>Amount:</strong> {formatCurrency(calc.amount!)}
        </p>
        <p>
          <strong>Currency:</strong> {calc.currency}
        </p>
        <p>
          <strong>Base Interest Rate:</strong> {calc.rate}%
        </p>
        <p>
          <strong>Margin:</strong> {calc.margin}%
        </p>

        <Button
          variant="contained"
          onClick={() =>
            setLoanData(formatLoanData({ ...calc, startDate, endDate }))
          }
        >
          Load
        </Button>
      </CardContent>
    </Card>
  );
};
