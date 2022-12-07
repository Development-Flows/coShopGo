import Link from "next/link";
import styles from "./login.module.css";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email()
          .required("Lütfen geçerli e-mail adresi giriniz."),
        password: Yup.string().required("Lütfen şifrenizi giriniz."),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        //  console.log("values::::::", values);
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 1000);
      }}
    >
       {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
            touched,
          }) => (
            <div className={styles.loginContainer}>
            <div className={styles.loginWrapper}>
              <div className={styles.loginText}>GİRİŞ YAP</div>
              <form onSubmit={handleSubmit} className={styles.loginForm}>
              {errors.email && touched.email && (
                <div className={styles.loginErrors}>{errors.email}</div>
              )}
              <label htmlFor="email"></label>
                <input 
                className={styles.mail} 
                id="email"
                type="email" 
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                />
                 {errors.password && touched.password && (
                <div className={styles.loginErrors}>{errors.password}</div>
              )}
                <label htmlFor="password"></label>
                <input
                  className={styles.password}
                  id="password"
                  type="password"
                  placeholder="Şifre"
                  value={values.password}
                  onChange={handleChange}
                />
                <button type="submit"
                disabled={isSubmitting} 
                className={styles.loginBtn}>GİRİŞ YAP</button>
              </form>
                <div className={styles.accountInfo}> Hesabınız yok mu?
                  <Link href="/account/register">
                    <span className={styles.registerRedirect}>Kayıt ol</span>
                  </Link>
                </div>
              
              <div className={styles.loginInfoContainer}>
                <div className={styles.loginInfo}>
                  E-ticaret altyapımızı size daha iyi bir deneyim sunmak için
                  yeniledik!
                </div>
              </div>
            </div>
          </div>
          )}
    </Formik>
  );
};

export default Login;
