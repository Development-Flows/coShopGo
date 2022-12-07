import styles from "./categories.module.css"

const categoriesData = [
    {
        image:"https://cdn.myikas.com/images/theme-images/6a449dd6-4cbe-4c65-921f-af5395c4a36f/image_1296.webp",
        title:"SNEAKER",
    },
    {
        image:"https://cdn.myikas.com/images/theme-images/81867ad8-cb4b-4411-8f95-5a895b52c6e8/image_1296.webp",
        title:"GİYİM",
    },
    {
        image:"https://cdn.myikas.com/images/theme-images/01c1c4e5-d2ea-4677-b8c8-cc55aaf66073/image_1296.webp",
        title:"AKSESUAR"
    }
]

const Categories = () => {
  return (
         <div className={styles.categoriesWrapper}>
            {
                categoriesData.map((categories,index) => (
                    <div className={styles.denemetwo}>   
                    <img className={styles.categoryImage} key={index} src={categories.image}/>
                    <div className={styles.deneme}>
                        <div className={styles.categoryTitle}>{categories.title}</div> 
                    </div>
                    </div>
                ))
            }
         </div>
  )
}

export default Categories