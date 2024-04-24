import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Form, FormikProps, useFormik, withFormik } from "formik";
import * as yup from "yup";
import "./AnnotationForm.scss";

interface FormValues {
  supplierName: string;
  purchaseDate: Date;
  totalAmount: number;
  currency: string;
}

interface OtherProps {
  message: string;
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

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { isSubmitting, message } = props;

  const validationSchema = yup.object({
    supplierName: yup
      .string()
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, "ad"),
  });

  const formik = useFormik({
    initialValues: {
      supplierName: "",
      purchaseDate: "",
      totalAmount: "",
      currency: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.resetForm();
    },
  });

  return (
    <Form className="annotationForm">
      <Typography variant="h5" component={"h5"} className="formTitle">
        {message}
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
        type="number"
        name="totalAmount"
        value={formik.values.totalAmount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
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

      <Button type="submit" disabled={isSubmitting} variant="contained">
        Submit
      </Button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      supplierName: "",
      purchaseDate: new Date(),
      totalAmount: 0,
      currency: "EUR",
    };
  },

  // Add a custom validation function (this can be async too!)
  //   validate: (values: FormValues) => {
  //     let errors: FormikErrors<FormValues> = {};
  //     if (!values.email) {
  //       errors.email = "Required";
  //     } else if (!isValidEmail(values.email)) {
  //       errors.email = "Invalid email address";
  //     }
  //     return errors;
  //   },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

// Use <MyForm /> wherevs
const AnnotationForm = () => (
  <div>
    <MyForm message="Annotate 'em all" />
  </div>
);

export default AnnotationForm;
