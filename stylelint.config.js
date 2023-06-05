module.exports = {
	plugins: ['stylelint'],
	extends: ['stylelint-config-standard', 'stylelint:recommended'],
	rules: {
		'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules'],
		'order/properties-order': ['display', 'width', 'height', 'margin', 'padding', '...other-properties...'],
	},
};
