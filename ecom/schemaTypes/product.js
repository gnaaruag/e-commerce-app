// productSchema.js

export default {
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
	  {
		name: 'productName',
		title: 'Product Name',
		type: 'string',
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'productId',
		title: 'Product ID',
		type: 'slug',
		options: {
		  source: 'productName', // Use productName field to generate the slug
		  maxLength: 200, // Maximum length of the slug
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'mainImage',
		title: 'Main Image',
		type: 'image',
		options: {
		  hotspot: true,
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'altImage0',
		title: 'Alt Image 0',
		type: 'image',
		options: {
		  hotspot: true,
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'altImage1',
		title: 'Alt Image 1',
		type: 'image',
		options: {
		  hotspot: true,
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'altImage2',
		title: 'Alt Image 2',
		type: 'image',
		options: {
		  hotspot: true,
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'altImage3',
		title: 'Alt Image 3',
		type: 'image',
		options: {
		  hotspot: true,
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'price',
		title: 'Price',
		type: 'number',
		validation: Rule => Rule.required().min(0),
	  },
	  {
		name: 'productCategory',
		title: 'Product Category',
		type: 'string',
		options: {
		  list: [
			{ title: 'Lehengas', value: 'lehengas' },
			{ title: 'Gift Set', value: 'giftset' },
			{ title: 'Men\'s Kurta', value: 'mensKurta' },
			{ title: 'Salwar Kurta', value: 'salwarKurta' },
			{ title: 'Sarees', value: 'sarees' },
		  ],
		},
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'productDescription',
		title: 'Product Description',
		type: 'text', // Assuming a short text description
		validation: Rule => Rule.required(),
	  }
	]
  }

  