description: 'Fillon calculator updates when brut is updated',

scenario: [
		HomepageWidget.testFillon(),
		FillonCalculatorWidget.setBrutField(1500),
		FillonCalculatorWidget.setTailleField(2),
		{
			'FillonCalculatorWidget.output': /[0-9]/
		}
]
