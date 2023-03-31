import { Grid, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/storeHooks";
import CurrencyRatesItem from "./CurrencyRatesItem";
import { useTranslation } from "react-i18next";

const CurrencyRatesContainer = () => {
  const { currencyRates, countryCurrency } = useAppSelector(
    (store) => store.news
  );
  const { t } = useTranslation();
  return (
    <Paper elevation={3} sx={{ marginY: 3 }}>
      <Typography variant="h5">{t("exchangeRates.title")}</Typography>
      <Typography mb={1}>
        {t("exchangeRates.currency")} {countryCurrency}
      </Typography>
      <Grid container spacing={2} sx={{ paddingX: 2, paddingBottom: 2 }}>
        {Object.keys(currencyRates).map((currency, i) => (
          <CurrencyRatesItem
            key={i}
            currency={currency}
            ratio={currencyRates[currency]}
            countryCurrency={countryCurrency}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default CurrencyRatesContainer;
