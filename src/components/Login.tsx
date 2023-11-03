import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent } from "react";
import { checkUser} from "../services/usersService"; // צריך להיות פונקציה להתחברות
import { errorMsg, successMsg } from "../services/feedbackservice";
import {Link, useNavigate} from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {

    const navigate = useNavigate()
    
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Invalid email format"),
      password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    }),

    onSubmit: (values) => {
        checkUser(values)
            .then(result => {
                console.log(result.data);
                sessionStorage.setItem("token", result.data.token);
                successMsg("You logged in successfully!");
                navigate("/home")
            })
            .catch(error => {
                console.log(error);
                errorMsg("Oops...something went wrong.");
            });
    },
    });
  // סגנון CSS לשלוט בעיצוב הדף
  const pageStyle: React.CSSProperties = {
    backgroundImage: "url('https://example.com/your-background-image.jpg')", // תמונת רקע מרשימה
    backgroundSize: "cover", // שולי התמונה יתאימו לגודל של הדף
    backgroundRepeat: "no-repeat", // אף חוזר על רקע
    backgroundColor: "beige", // רקע גוני אפשרי להשתנות לפי התכנים
    color: "black", // צבע טקסט לבן
    minHeight: "100vh", // הגדרת מינימום גובה לדף באורך מסך החלון
    display: "flex", // תצוגת Flex כדי ליצור אליכם מרכז התוכן
    justifyContent: "center", // מרכז את התוכן אופקית
    alignItems: "center", // מרכז את התוכן אנכית
    flexDirection: "column", // תצוגת עמוד במקום תצוגת שורות
    padding: "20px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2rem", // גודל טקסט גדול יותר
    marginBottom: "20px", // מרווח למטה
  };

  const formStyle: React.CSSProperties = {
    width: "100%", // רוחב מקורי
    maxWidth: "400px", // רוחב מרבי
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "15px", // מרווח בין שדות הטקסט
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#007bff", // צבע כפתור
    color: "#ffffff", // צבע טקסט בכפתור
    border: "none", // ללא גבול
    borderRadius: "5px", // פינות מעוגלות
    padding: "10px 20px", // רווח בתוך הכפתור
    cursor: "pointer", // סמן ליד כפתור
  };

  const errorStyle: React.CSSProperties = {
    color: "#ff0000", // צבע טקסט אדום
    fontSize: "0.8rem", // גודל טקסט קטן
    marginTop: "5px", // מרווח למעלה מהשדה
  };

  return (
    <div style={pageStyle}>
      <h1 className="display-4" style={titleStyle}>
        LOGIN
      </h1>
      <form onSubmit={formik.handleSubmit} style={formStyle}>
        <div className="mb-3">
          <label htmlFor="inputEmaillogin" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            id="inputEmaillogin"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            style={inputStyle}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback" style={errorStyle}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="inputPasswordlogin" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
            id="inputPasswordlogin"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            style={inputStyle}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback" style={errorStyle}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-secondary w-100"
          style={buttonStyle}
          disabled={!formik.isValid || !formik.dirty}
        >
          Submit
        </button>
        <Link to="/register">New const  ?Register </Link>
      </form>
    </div>
  );
};

export default Login;
