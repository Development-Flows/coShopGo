import styles from "./register.module.css"
import Link from "next/link";

const Register = () => {
  return (
   <div className={styles.registerContainer}>
      <div className={styles.registerWrapper}>
        <div className={styles.registerTitle}>ÜYE OL</div>
        <form className={styles.registerForm}>
            <input className={styles.registerInput} type="text" placeholder="Ad"/>
            <input className={styles.registerInput} type="text" placeholder="Soyad"/>
            <input className={styles.registerInput} type="text" placeholder="E-mail"/>
            <input className={styles.registerInput} type="text" placeholder="Şifre"/>
            <button className={styles.registerBtn}>ÜYE OL</button>
            <div className={styles.shortInfo}>
              <div className={styles.info}>Zaten hesabınız var mı?</div>
              <Link href="/account/login"><div className={styles.infoTwo}>Üye Girişi</div></Link>
            </div>
        </form>
      </div>
   </div>
  )
}

export default Register