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
      title: "HESABIM",
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
    }
  ]
};
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        {footerData.allItems.map((item, index) => (
          <>     
          <div className={styles.titles} key={index}>{item.title}</div>
           </>
        ))}
      </div>
    </div>
  );
};

export default Footer;
