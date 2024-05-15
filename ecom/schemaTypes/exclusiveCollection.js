export default {
	name: 'exclusiveCollection',
	title: 'Exclusive Collection',
	type: 'document',
	fields: [
	  {
		name: 'productName',
		title: 'Product Name',
		type: 'string',
		validation: Rule => Rule.required(),
	  },
	  {
		name: 'product',
		title: 'Product',
		type: 'reference',
		to: [{ type: 'product' }],
		validation: Rule => Rule.required(),
	  },
	],
  };
  