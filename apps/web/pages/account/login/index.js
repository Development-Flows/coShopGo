import Link from "next/link";
import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginText}>GİRİŞ YAP</div>
        <form className={styles.loginForm}>
          <input className={styles.mail} type="text" placeholder="E-mail" />
          <input
            className={styles.password}
            type="password"
            placeholder="Şifre"
          />
          <button className={styles.loginBtn}>GİRİŞ YAP</button>
        </form>
        <div className={styles.subInfo}>
          <div className={styles.forgotPassword}>Parolamı Unuttum</div>
          <div className={styles.accountInfo}>
            Hesabınız yok mu?
            <Link href="/account/register"><span className={styles.registerRedirect}>Kayıt ol</span></Link>
          </div>
        </div>
        <div className={styles.loginInfoContainer}>
          <div className={styles.loginInfo}>
            E-ticaret altyapımızı size daha iyi bir deneyim sunmak için
            yeniledik!
          </div>
          <div className={styles.loginInfoTwo}>
            Hesabınıza giriş yapamıyorsanız
            <span className={styles.smallInfo}> PAROLAMI UNUTTUM </span>
            butonunu kullanarak şifrenizi yenilemelisiniz
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
