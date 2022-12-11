import styles from './NewProduct.module.css'
import {Input, Select, InputNumber, Button, Drawer, Tooltip, message, Form} from 'antd';

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

	const [messageApi, contextHolder] = message.useMessage();

	const AddProductSuccessful = () => {
		messageApi.open({
			type: 'Başarılı',
			content: 'Ürün Ekleme Başarılı',
		});
	};
	const selectChangeHandler = (value) => {
		setFormInputs({...formInputs, category: value})
	}
	const descChangeHandler = (e) => {
		setFormInputs({...formInputs, description: e.target.value})
	}
	const discountPriceChangeHandler = (value) => {
		setFormInputs({...formInputs, discountPrice: value})
	}
	const salePriceChangeHandler = (value) => {
		setFormInputs({...formInputs, salePrice: value})
	}
	const nameChangeHandler = (e) => {
		setFormInputs({...formInputs, name: e.target.value})
	}
	const groupColorNameChange = (e) => {
		setVariantDetails({...variantDetails, name: e.target.value})
	}

	const getCategoryHandler = () => {
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
		setLoading(true)
		let variantArray = [];
		variantList.map((product) => {
			variantArray.push({
				modelCode: product.modelCode,
				variation: product.variantName,
				priceMarket: product?.marketPrice ? product.marketPrice : 0,
				priceSale: product.salePrice,
				stock: product.stock,
				colorName: product.modelCode,
				category: formInputs.category,
			})
		})

		Axios.post("http://localhost:4000/api/product/add", {
			NAME: formInputs.name,
			DESC: formInputs.description,
			PHOTOS: [],
			COLORS: variantArray
		}).then((response) => response.data).then((data) => {
			if (data.status === true) {
				AddProductSuccessful()
				//clear state
				setVariantList([])
				setVariantDetailPopup(false)
				setVariantDetails({})
				setFormInputs({})
				setVariantPopup(false)
			}
		}).finally(() => setLoading(false));
	}

	const createVariantHandler = (variantName, stock, priceSale = formInputs?.salePrice, priceMarket = formInputs?.priceMarket) => {
		//variantName ve stock zorunlu
		if (!variantName) return;
		if (variantName.length <= variantList.length) return

		setVariantList([...variantList, {
			modelCode: `${variantDetails.name}`,
			variantName: variantName,
			stock: stock,
			salePrice: priceSale,
			marketPrice: priceMarket
		}])
	}

	const removeVariantItem = (variantDetail) => {
		if (!variantDetail) return;
		const newVariantList = variantList.filter((variant) => variant.variantName !== variantDetail.variantName)
		setVariantList(newVariantList)
	}

	const deselectChangeHandler=(variantName)=>{
		if (!variantName) return;
		const newVariantList = variantList.filter((variant) => variant.variantName !== variantName)
		setVariantList(newVariantList)
	}

	const updateVariantDetailHandler = () => {
		const getSelectedVariant = variantList.find((variant) => variant.variantName === variantDetails.variantName)
		if (!getSelectedVariant) return;
		setVariantList([...variantList.filter(x => x.variantName !== variantDetails.variantName), {
			modelCode: variantDetails.modelCode,
			variantName: variantDetails.variantName,
			stock: variantDetails.stock,
			salePrice: variantDetails.salePrice,
			marketPrice: variantDetails.marketPrice
		}])
		setVariantDetailPopup(false);
		setVariantDetails({})
	}

	const variantDetailHandler = (caminData) => {
		const getSelectedVariant = variantList.find((variant) => variant.variantName === caminData.variantName)
		console.log("variantNamevariantName", getSelectedVariant, "variantListvariantList", variantList)
		setVariantDetailPopup(true);
		setVariantDetails({
			name: variantDetails.name ?? "",
			modelCode: getSelectedVariant.modelCode,
			variantName: getSelectedVariant.variantName,
			salePrice: getSelectedVariant.salePrice,
			marketPrice: getSelectedVariant.marketPrice,
			stock: getSelectedVariant.stock
		})
	}

	useEffect(() => {
		getCategoryHandler()
	}, [])

	return <div className={styles.productContainer}>
		{contextHolder}
		<Form>
			<div className={styles.perGroup}>
				<h3>Ürün Temel Bilgiler</h3>
				<div className={styles.perItem}>
					<Form.Item label="Ürün Adı">
						<Input onChange={nameChangeHandler} maxLength={70} size={"large"}></Input>
					</Form.Item>
				</div>
				<div className={styles.perItem} style={{display: "flex"}}>
					<Form.Item label="Satış Fiyatı" style={{width: '50%'}}>
						<InputNumber onChange={salePriceChangeHandler}
									 formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									 max={100000}></InputNumber>
					</Form.Item>

					<Form.Item label="Market Fiyatı" style={{width: '50%'}}>
						<InputNumber onChange={discountPriceChangeHandler}
									 formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									 max={100000}></InputNumber>
					</Form.Item>
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
		</Form>

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
						<Input disabled={variantList.length > 0} onChange={groupColorNameChange}
							   placeholder={"Renk Grubu Adı"}/>
						<div className={styles.variantList}>
							<h5>Beden Ekle</h5>
							<Select mode="tags"
									style={{width: '100%'}}
									size={"large"}
									placeholder="Lütfen Beden Seçiniz"
									onDeselect={deselectChangeHandler}
									onChange={(value) => createVariantHandler(value, 0)}
							/>
							{variantList.length > 0 && variantList.map((variant, index) => {
								return <div key={index} className={styles.variantItem}>
									<span>Varyant: {variant.variantName}</span>
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
												<Form>
													<Form.Item label="Varyant Adı">
														<Input style={{width: '100%'}} placeholder={"Variant İsmi"}
															   value={variantDetails.variantName}
															   disabled={true}
														></Input>
													</Form.Item>
													<Form.Item label="Stok">
														<InputNumber style={{width: '100%'}} max={50}
																	 placeholder={"Stok"}
																	 onChange={(value) => setVariantDetails({
																		 ...variantDetails,
																		 stock: value
																	 })} value={variantDetails.stock}></InputNumber>
													</Form.Item>

													<Form.Item label="Satış Fiyatı">
														<InputNumber
															value={variantDetails.salePrice}
															onChange={(value) => setVariantDetails({
																...variantDetails,
																salePrice: value
															})}
															formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
															style={{width: '100%'}} max={100000}
															placeholder={"Satış Fiyatı"}></InputNumber>
													</Form.Item>

													<Form.Item label="İndirimli Fiyat">
														<InputNumber style={{width: '100%'}} max={100000}
																	 value={variantDetails.marketPrice ?? 0}
																	 onChange={(value) => setVariantDetails({
																		 ...variantDetails,
																		 marketPrice: value
																	 })}
																	 placeholder={"İndirimli Satış Fiyatı"}
																	 formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
														></InputNumber>
													</Form.Item>


												</Form>

												<div className={styles.confirmButtons}>
													<Button
														onClick={() => updateVariantDetailHandler(variant)}>Kaydet</Button>
												</div>

											</div>
										</Drawer>
										<Button onClick={() => variantDetailHandler(variant)}
												type="text">Düzenle</Button>
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