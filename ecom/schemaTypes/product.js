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
		type: 'string',
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
		name: 'alternativeImages',
		title: 'Alternative Images',
		type: 'array',
		of: [{ type: 'image', options: { hotspot: true } }],
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
		type: 'reference',
		to: [{ type: 'productCategory' }],
		validation: Rule => Rule.required(),
	  }
	]
  }
  