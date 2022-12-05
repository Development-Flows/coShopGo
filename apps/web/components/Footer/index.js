import styles from "./footer.module.css";

const footerData = {
  allItems: [
    {
      title: "SİTE HARİTASI",
      items: [
        {
          text: "SNEAKER",
        },
        {
          text: "GİYİM",
        },
        {
          text: "AKSESUAR",
        },
        {
          text: "YENİLER",
        },
        {
          text: "İNDİRİM",
        },
      ],
    },
    {
      title: "KURUMSAL",
      items: [
        {
          text: "HAKKIMIZDA",
        },
        {
          text: "İLETİŞİM",
        },
        {
          text: "S.S.S",
        },
        {
          text: "AYDINLATMA METNİ",
        },
      ],
    },
    {
      title: "HESABIM",
      items: [
        {
          text: "ÜYE OL",
        },
        {
          text: "GİRİŞ YAP",
        },
        {
          text: "SİPARİŞLERİM",
        },
        {
          text: "FAVORİLERİM",
        },
      ],
    }
  ]
};
const Footer = () => {
  return (
    <>    
    <div className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        {footerData.allItems.map((item, index) => (
          <div className={styles.footerArea}>    
          <div className={styles.titles} key={index}>{item.title}</div>
          <div className={styles.subItems}>
            {
              item.items.map((x) => (
                <div className={styles.subText}>{x.text}</div>
              ))
            }
          </div>
           </div>
        ))}
      </div>
      
    </div>
      <div className={styles.footerCopyRightArea}>
        <div className={styles.footerCopyRightText}>Copyright © 2022 coShopGo. İçeriklerin izinsiz kopyalanması yasaktır.</div>
      </div>
    </>
  );
};




export default Footer;
