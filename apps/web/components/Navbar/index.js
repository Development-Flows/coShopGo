import styles from "./navbar.module.css";
import {
  ShoppingOutlined,
  UserOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import cn from "classnames";
import Link from "next/link";

const navbarMenuData = {
  navbarMenuItems: [
    {
      navTitle: "YENİLER",
    },
    {
      navTitle: "SNEAKER",
    },
    {
      navTitle: "GİYİM",
    },
    {
      navTitle: "AKSESUAR",
    },
    {
      navTitle: "MARKALAR",
    },
    {
      navTitle: "İNDİRİM",
    },
  ],
};

const Navbar = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [bagModal, setBagModal] = useState(false);

  return (
    <>
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarArea}>
          <div className={styles.brandName}>coShopGo</div>
          {navbarMenuData.navbarMenuItems.map((items, index) => (
            <div className={styles.navbarTitle} key={index}>
              {items.navTitle}
            </div>
          ))}
        </div>
        <div className={styles.navbarRight}>
          <input
            onClick={() => setSearchModal(true)}
            className={styles.search}
            type="text"
            placeholder="Ürün, Marka veya Kategori ara."
          />
          <div style={{ fontSize: "20px" }} className={styles.searchIcon}>
            <SearchOutlined />
          </div>
          <div
            onClick={() => setBagModal(true)}
            className={styles.bag}
            style={{ fontSize: "22px" }}
          >
            <ShoppingOutlined />
          </div>
          {/* AÇILIR KAPANIR SEPET AREA START */}

          <div
            className={cn(
              styles.bagModalContainer,
              bagModal ? styles.bagModalContainerActive : ""
            )}
          >
            <div className={styles.bagModalDetail}>
              <div className={styles.title}>Sepetim</div>
              <button
                onClick={() => setBagModal(false)}
                className={styles.bagcloseModal}
                style={{ fontSize: "18px" }}
              >
                <CloseOutlined />
              </button>
            </div>
            <div className={styles.bagModaltext}>Sepetiniz Boş</div>
            <button className={styles.bagModalButton}>ALIŞVERİŞE BAŞLA</button>
          </div>
          {/* AÇILIR KAPANIR SEPET AREA END */}
          <Link href="/account/login">
            <div className={styles.login} style={{ fontSize: "22px" }}>
              <UserOutlined />
            </div>
          </Link>
        </div>
      </div>
      {/* SEARCH AREA START */}
      <div
        className={cn(
          styles.searchContainer,
          searchModal ? styles.searchContainerActive : ""
        )}
      >
        <div className={styles.searchWrapper}>
          <div className={styles.searchTitle}>POPÜLER ARAMALAR</div>
          <ul className={styles.searchList}>
            <li className={styles.searchItem}>nike</li>
            <li className={styles.searchItem}>erkek ayakkabı</li>
            <li className={styles.searchItem}>adidas</li>
            <li className={styles.searchItem}>kadın ayakkabı</li>
          </ul>
          <button
            onClick={() => setSearchModal(false)}
            className={styles.closeModal}
            style={{ fontSize: "20px" }}
          >
            <CloseOutlined />
          </button>
        </div>
        <div className={styles.gnTitle}>EŞLEŞEN ÜRÜNLER</div>
      </div>
      {/* SEARCH AREA END */}
    </>
  );
};

export default Navbar;
