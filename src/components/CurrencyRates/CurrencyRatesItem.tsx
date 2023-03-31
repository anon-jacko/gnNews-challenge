import { Grid, Paper, Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import { CurrencyRatesItemProps } from "../../interfaces/newsInterfaces";

const CurrencyRatesItem = ({
  currency,
  ratio,
  countryCurrency,
}: CurrencyRatesItemProps) => {
  return (
    <Grid item xs={6} md={3}>
      <Paper
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          paddingX: 1,
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: Boolean(Math.round(Math.random())) ? red[400] : green[400],
          }}
        >
          {currency}/{countryCurrency}: {(1 / ratio).toFixed(3)}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default CurrencyRatesItem;
