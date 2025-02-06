import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
     .min(3, "Password must be at least 3 characters")
    // .max(20, "Password cannot exceed 20 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/\d/, "Password must contain at least one number")
    // .matches(
    //   /[!@#$%^&*(),.?":{}|<>]/,
    //   "Password must contain at least one special character"
    // )
    .required("Password is required"),
});
