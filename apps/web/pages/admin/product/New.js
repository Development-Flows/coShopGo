import styles from './NewProduct.module.css'
import {Input, Select, InputNumber, Button, Drawer, Tooltip} from 'antd';

import {useCallback, useState, useEffect} from 'react';
import Axios from 'axios'

const NewProduct = () => {
	const {TextArea} = Input;

	const [categoryList, setCategoryList] = useState([]);
	const [loading, setLoading] = useState(false)
	const [formInputs, setFormInputs] = useState({});
	const [variantPopup, setVariantPopup] = useState(false);
	const [variantList, setVariantList] = useState([]);
	const [variantDetails, setVariantDetails] = useState({});
	const [variantDetailPopup, setVariantDetailPopup] = useState(false);


	useEffect(() => {
		console.log("variantDetailsvariantDetailsvariantDetailsvariantDetails", variantDetails)
	}, [variantDetails]);

	const selectChangeHandler = (value) => {
		console.log(value);
		setFormInputs({...formInputs, category: value})
	}
	const descChangeHandler = (e) => {
		console.log("value", e)
		setFormInputs({...formInputs, description: e.target.value})
	}
	const discountPriceChangeHandler = (value) => {
		console.log("discountPriceChangeHandler")
		setFormInputs({...formInputs, discountPrice: value})
	}
	const salePriceChangeHandler = (value) => {
		setFormInputs({...formInputs, salePrice: value})
	}
	const nameChangeHandler = (e) => {
		console.log("name")
		setFormInputs({...formInputs, name: e.target.value})
	}
	const variantNameChange = (e) => {
		setVariantDetails({...variantDetails, name: e.target.value})
	}

	const categoryOnMouseHandler = () => {
		setLoading(true)
		Axios.get("http://localhost:4000/api/category/getAll").then((response) => response.data).then((res) => {
			if (res.status === true) {
				let categoryArray = [];
				res.data.map((category) => categoryArray.push({
					value: category.id,
					label: category.name
				}));
				setCategoryList(categoryArray)
			}
		}).finally(() => setLoading(false));
	};

	const addVariantHandler = () => {
		console.log("addVariantHandler")
	}

	const getRandomText = () => {
		//Generate 5 random characters
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		possible = possible.split("");
		for (let i = 0; i < 5; i++) {
			text += possible[Math.floor(Math.random() * possible.length)];
		}
		return text;
	}

	const createVariantHandler = (variantName, stock, priceSale = formInputs?.salePrice, priceMarket = formInputs?.priceMarket) => {
		//variantName ve stock zorunlu
		if (!variantName) return;
		console.log("createVariantHandler", {variantName, stock, priceSale, priceMarket})
		if (variantName.length <= variantList.length) return

		const getCurrentVariantName = variantName.pop()
		setVariantList([...variantList, {
			modelCode: `${variantDetails.name}-${getRandomText()}`,
			variantName: getCurrentVariantName,
			stock: stock,
			salePrice: priceSale,
			marketPrice: priceMarket
		}])
	}

	const removeVariantItem = (variantDetail) => {
		if (!variantDetail) return;
		const newVariantList = variantList.filter((variant) => variant.name !== variantDetail.name)
		setVariantList(newVariantList)
	}

	const updateVariantDetailHandler = () => {
		console.log("updateVariantDetailHandler", variantDetails)
		//change selected variant name
		const getSelectedVariant = variantList.find((variant) => variant.variantName === variantDetails.variantName)
		if (!getSelectedVariant) return;
		console.log("lastList", variantList)
		console.log("newList=>", [...variantList.filter(x => x.variantName !== variantDetails.variantName), {
			modelCode: variantDetails.modelCode,
			variantName: variantDetails.variantName,
			stock: variantDetails.stock,
			salePrice: variantDetails.salePrice,
			marketPrice: variantDetails.marketPrice
		}])
		//setVariantList({...variantList.filter(x=>x.name!==variantDetails.variantName), variantDetails})
		setVariantDetailPopup(false);
		setVariantDetails({})
	}

	const variantDetailHandler=(variantName)=>{
		const getSelectedVariant = variantList.find((variant) => variant.variantName === variantName)
		console.log("variantDetailHandler", variantDetails)
		setVariantDetailPopup(true);
		setVariantDetails({
			modelCode: getSelectedVariant.modelCode,
			variantName: getSelectedVariant.variantName,
			salePrice: getSelectedVariant.salePrice,
			marketPrice: getSelectedVariant.marketPrice,
			stock: getSelectedVariant.stock
		})
	}

	useEffect(() => {
		categoryOnMouseHandler()
	}, [])

	return <div className={styles.productContainer}>
		{<pre>{JSON.stringify(formInputs, null, 2)}</pre>}
		<div className={styles.perGroup}>
			<h3>Ürün Temel Bilgiler</h3>
			<div className={styles.perItem}>
				<Input onChange={nameChangeHandler} maxLength={70} size={"large"} placeholder={"Ürün Adı"}></Input>
			</div>
			<div className={styles.perItem}>
				<InputNumber onChange={salePriceChangeHandler}
							 formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							 style={{width: '50%'}} max={100000} placeholder={"Satış Fiyatı"}></InputNumber>
				<InputNumber onChange={discountPriceChangeHandler} style={{width: '50%'}} max={100000}
							 placeholder={"İndirimli Satış Fiyatı"}
							 formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				></InputNumber>

			</div>
		</div>
		<div className={styles.perGroup}>
			<h3>Ürün Açıklaması</h3>
			<div className={styles.perItem}>
				<TextArea maxLength={150} onChange={descChangeHandler} rows={4} placeholder="Ürün Açıklaması"/>
			</div>
			<div className={styles.perItem}>
				<Select mode="multiple"
						loading={loading}
						showSearch
						style={{width: '100%'}}
						placeholder="Lütfen Kategori Seçiniz"
						onChange={selectChangeHandler}
						options={categoryList}/>
			</div>
		</div>

		<div className={styles.perGroup}>
			<h3>Varyantlar</h3>
			<div className={styles.perItem}
				 style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<p>Ürün için renk seçimi yapın</p>
				<Tooltip placement="topRight"
						 title={formInputs?.salePrice ? undefined : "Varyant Eklemek için Ürün Fiyatı Giriniz"}>
					<Button disabled={!formInputs?.salePrice} onClick={() => setVariantPopup(true)}>Varyant
						Ekle</Button>
				</Tooltip>
				<Drawer width={500} title={variantDetails?.name ? variantDetails.name : "Varyant"}
						onClose={() => setVariantPopup(false)} open={variantPopup}>
					<div className={styles.drawerHead}>
						<h3>Varyant Ekle</h3>
						<div className={styles.buttons}>
							<Button danger type="text" onClick={() => {
								setVariantPopup(false);
								setVariantList([])
							}}>Kapat</Button>
							<Button onClick={addVariantHandler}>Varyant Ekle</Button>
						</div>
					</div>
					<div className={styles.content}>
						<Input disabled={variantList.length > 0} onChange={variantNameChange}
							   placeholder={"Renk Grubu Adı"}/>
						<div className={styles.variantList}>
							<h5>Beden Ekle</h5>
							<Select mode="tags"
									style={{width: '100%'}}
									placeholder="Lütfen Beden Seçiniz"
									onChange={(value) => createVariantHandler(value, 0)}
							/>
							<pre>{JSON.stringify(variantList, null, 2)}</pre>

							{variantList.length > 0 && variantList.map((variant, index) => {
								return <div className={styles.variantItem}>
									<span>Color {variant.variantName}</span>
									<span className={styles.name}>{variant.name}</span>
									<div className={styles.buttons}>
										<Drawer
											title="Varyant Detayları"
											width={320}
											closable={false}
											onClose={() => setVariantDetailPopup(false)}
											open={variantDetailPopup}
										>
											<div className={styles.variantDetails}>
												<Input placeholder={"Variant İsmi"}
													   defaultValue={variantDetails.variantName}
													   disabled={true}
												></Input>
												<InputNumber max={50} placeholder={"Stok"}
															 onChange={(value) => setVariantDetails({
																 ...variantDetails,
																 stock: value
															 })} defaultValue={0}></InputNumber>
												<InputNumber
													defaultValue={variantDetails.salePrice}
													onChange={(value) => setVariantDetails({
														...variantDetails,
														salePrice: value
													})}
													formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													style={{width: '50%'}} max={100000}
													placeholder={"Satış Fiyatı"}></InputNumber>
												<InputNumber style={{width: '50%'}} max={100000}
															 defaultValue={variantDetails.marketPrice}
															 onChange={(value) => setVariantDetails({
																 ...variantDetails,
																 marketPrice: value
															 })}
															 placeholder={"İndirimli Satış Fiyatı"}
															 formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												></InputNumber>

												<div className={styles.confirmButtons}>
													<Button
														onClick={() => updateVariantDetailHandler(variant)}>Onayla</Button>
												</div>

											</div>
										</Drawer>
										<Button onClick={()=>variantDetailHandler(variant.variantName)} type="text">Düzenle</Button>
										<Button onClick={() => removeVariantItem(variant)} danger
												type="text">Sil</Button>
									</div>
								</div>

							})}
						</div>
					</div>

				</Drawer>
			</div>
		</div>


	</div>
}
export default NewProduct;