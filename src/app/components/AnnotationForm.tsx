import {
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import "./AnnotationForm.scss";

interface FormValues {
  supplierName: string;
  purchaseDate: Date;
  totalAmount: string;
  currency: string;
}

const currencies = [
  {
    value: "EUR",
  },
  {
    value: "NOK",
  },
  {
    value: "SEK",
  },
  {
    value: "DKK",
  },
];

const AnnotationForm = ({ onStateChange }: any) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleChangeFormState = (value: boolean) => {
    onStateChange(value);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const validationSchema = yup.object({
    supplierName: yup
      .string()
      .matches(
        /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/,
        "Please enter valid name"
      )
      .min(1, "Supplier name must be at least 1 character")
      .required("Supplier name is required"),
    purchaseDate: yup
      .date()
      .typeError("Please enter a valid date")
      .min("1970-01-01", "Date is too early")
      .required("Date of the purchase is required"),
    totalAmount: yup
      .number()
      .typeError("Please enter a valid number")
      .positive("Total amount must be positive")
      .required("Total amount is required"),
    currency: yup
      .string()
      .oneOf(currencies.map((currency) => currency.value))
      .required("Currency is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setSubmitting(true);
      // Perform form submission logic here
      console.log(values);
      await axios.post("/api/saveFormData", values);
      setOpenSnackbar(true);

      // Set submitting to false after successful submission
      setSubmitting(false);
      handleChangeFormState(true);
      resetForm();
    } catch (error) {
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      supplierName: "",
      purchaseDate: new Date("yyyy-MM-dd"),
      totalAmount: "",
      currency: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form className="annotationForm" onSubmit={formik.handleSubmit}>
        <Typography variant="h4" component="h4" className="formTitle">
          Annotate &apos;Em all
        </Typography>

        <TextField
          label="Supplier name"
          type="text"
          name="supplierName"
          value={formik.values.supplierName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.supplierName && Boolean(formik.errors.supplierName)
          }
          helperText={formik.touched.supplierName && formik.errors.supplierName}
          className="input"
          autoComplete="true"
          required
        />

        <TextField
          label="Date of the purchase"
          type="Date"
          name="purchaseDate"
          value={formik.values.purchaseDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.purchaseDate && Boolean(formik.errors.purchaseDate)
          }
          className="input input--withLegend"
          autoComplete="true"
          required
        />

        <TextField
          label="Total amount"
          type="text"
          name="totalAmount"
          value={formik.values.totalAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.totalAmount && Boolean(formik.errors.totalAmount)
          }
          helperText={formik.touched.totalAmount && formik.errors.totalAmount}
          className="input"
          autoComplete="true"
          required
        />

        <TextField
          label="Currency"
          select
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currency && Boolean(formik.errors.currency)}
          className="input"
          autoComplete="true"
          defaultValue={currencies.length > 0 ? currencies[0].value : ""}
          inputProps={{ className: "selectBox" }}
          required
        >
          {currencies.map((option, id) => (
            <MenuItem key={id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          disabled={submitting}
          variant="contained"
          className="button"
        >
          Submit
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Data saved successfully, you will be redirected. "
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          classes: {
            root: "successSnackbar",
          },
        }}
      />
    </>
  );
};

export default AnnotationForm;
