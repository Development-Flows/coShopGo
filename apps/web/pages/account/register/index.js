import styles from "./register.module.css";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  return (
    <Formik
      initialValues={{
        name:"",
        surname:"",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("İsim giriniz"),
        surname: Yup.string().required("Soyisim giriniz."),
        email: Yup.string()
          .email()
          .required("Lütfen geçerli e-mail adresi giriniz."),
        password: Yup.string().required("Lütfen şifrenizi giriniz."),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        console.log("values::::::", values);
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
        <div className={styles.registerContainer}>
          <div className={styles.registerWrapper}>
            <div className={styles.registerTitle}>ÜYE OL</div>
            <form  onSubmit={handleSubmit} className={styles.registerForm}>
              {errors.name && touched.name && (
                <div className={styles.loginErrors}>{errors.name}</div>
              )}
              <label htmlFor="name"></label>
              <input
                className={styles.registerInput}
                type="text"
                id="name"
                value={values.text}
                onChange={handleChange}
                placeholder="Ad"
              />
              {errors.surname && touched.surname && (
                <div className={styles.loginErrors}>{errors.surname}</div>
              )}
              <label htmlFor="surname"></label>
              <input
                className={styles.registerInput}
                type="surname"
                id="surname"
                value={values.text}
                onChange={handleChange}
                placeholder="Soyad"
              />
              {errors.email && touched.email && (
                <div className={styles.loginErrors}>{errors.email}</div>
              )}
              <label htmlFor="email"></label>
              <input
                className={styles.registerInput}
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                placeholder="E-mail"
              />
              {errors.password && touched.password && (
                <div className={styles.loginErrors}>{errors.password}</div>
              )}
              <label htmlFor="password"></label>
              <input
                className={styles.registerInput}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Şifre"
              />
              <button  type="submit"    disabled={isSubmitting}  className={styles.registerBtn}>ÜYE OL</button>
              <div className={styles.shortInfo}>
                <div className={styles.info}>Zaten hesabınız var mı?</div>
                <Link href="/account/login">
                  <div className={styles.infoTwo}>Üye Girişi</div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
