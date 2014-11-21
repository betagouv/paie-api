description: 'API is live',

scenario: [
		HomepageWidget.testApi(),
		SwaggerWidget.setBrutField(1200),
		SwaggerWidget.send(),
		{
			'SwaggerWidget.response': true
		}
]
