// popularThisMonthSchema.js

export default {
	name: 'popularThisMonth',
	title: 'Popular This Month',
	type: 'document',
	fields: [
	  {
		name: 'products',
		title: 'Products',
		type: 'array',
		of: [{ type: 'reference', to: [{ type: 'product' }] }],
		validation: Rule => Rule.required(),
	  }
	]
  }
  