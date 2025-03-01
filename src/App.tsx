import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LoanCalculator } from "./Components/LoanCalculator";
import "dayjs/locale/en-gb";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <LoanCalculator />
    </LocalizationProvider>
  );
};

export default App;
