import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  it("renders form and relevant fields", () => {
    render(<App />);

    const title = screen.getByText("Loan Calculator");
    expect(title).toBeInTheDocument();

    const startDateInput = screen.getByLabelText("Start Date");
    expect(startDateInput).toBeInTheDocument();

    const endDateInput = screen.getByLabelText("End Date");
    expect(endDateInput).toBeInTheDocument();

    const amountInput = screen.getByLabelText("Loan Amount *");
    expect(amountInput).toBeInTheDocument();

    const currencySelect = screen.getByLabelText("Currency");
    expect(currencySelect).toBeInTheDocument();

    const baseInterestRateInput = screen.getByLabelText(
      "Base Interest Rate (%) *"
    );
    expect(baseInterestRateInput).toBeInTheDocument();

    const marginInput = screen.getByLabelText("Margin (%) *");
    expect(marginInput).toBeInTheDocument();
  });

  it("can submit the form and see a calculated loan", async () => {
    render(<App />);

    const placeholderText = await screen.findByText(
      "Fill out the form above or load a saved loan"
    );
    expect(placeholderText).toBeInTheDocument();

    const startDateInput = screen.getByRole("button", {
      name: "Choose date, selected date is 1 Mar 2025",
    });
    await userEvent.click(startDateInput);
    await userEvent.click(await screen.findByRole("gridcell", { name: "10" }));

    const endDateInput = screen.getByRole("button", {
      name: "Choose date, selected date is 2 Mar 2025",
    });
    await userEvent.click(endDateInput);
    await userEvent.click(screen.getByText("15"));

    const amountInput = screen.getByLabelText("Loan Amount *");
    await userEvent.type(amountInput, "10000");

    const baseInterestRateInput = screen.getByLabelText(
      "Base Interest Rate (%) *"
    );
    await userEvent.type(baseInterestRateInput, "5");

    const marginInput = screen.getByLabelText("Margin (%) *");
    await userEvent.type(marginInput, "3");

    const calculateButton = screen.getByText("Calculate Loan");
    await userEvent.click(calculateButton);

    const submitButton = screen.getByRole("button", { name: "Calculate Loan" });
    await userEvent.click(submitButton);

    const loanScheduleTitle = await screen.findByText("Loan Schedule");
    expect(loanScheduleTitle).toBeInTheDocument();
  });
});
