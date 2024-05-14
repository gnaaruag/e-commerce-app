// productCategorySchema.js

export default {
	name: 'productCategory',
	title: 'Product Category',
	type: 'document',
	fields: [
	  {
		name: 'categoryName',
		title: 'Category Name',
		type: 'string',
		validation: Rule => Rule.required(),
		options: {
		  list: [
			{ title: 'Sarees', value: 'sarees' },
			{ title: 'Lehengas', value: 'lehengas' },
			{ title: 'Salwar Kurta', value: 'salwarKurta' },
			{ title: 'Mens Kurta', value: 'mensKurta' },
			{ title: 'Gift Set', value: 'giftSet' }
		  ]
		}
	  }
	]
  }
  