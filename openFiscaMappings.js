/** Transforms Paie API queries to a JSON object that can be sent to the OpenFisca web API.
*/

var ID = 'ind0';


function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

function wrap(openFiscaScenario, requestedValues) {
	return {
		scenarios: [ openFiscaScenario ],
		variables: requestedValues
	}
}

function wrapSinglePerson(openFiscaIndividualValues) {
	var individual = clone(openFiscaIndividualValues);

	individual.id = ID;

	return	{
		'test_case': {
			'familles': [
				{
					'parents': [ ID ]
				}
			],
			'foyers_fiscaux': [
				{
					'declarants': [ ID ]
				}
			],
			'individus': [ individual ],
			'menages': [
				{
					'personne_de_reference': ID
				}
			]
		},
		'legislation_url': 'http://api.openfisca.fr/api/1/default-legislation'
	}
}

function getCurrentMonthISO() {
	return '2014-11';	// TODO
}

module.exports = {
	calculateNet: function(params) {
		var openFiscaSituation = {
			'activite'	:'Actif occupé',
			'type_sal'	:'prive_cadre'
		};

		var VARNAMES_MAPPING = {
			brut		: 'salbrut',
			imposable	: 'sali'
		};

		for (var queryVariable in VARNAMES_MAPPING) {
			if (params[queryVariable] !== undefined) {	// allow 0
				var salaries = {};
				salaries[getCurrentMonthISO()] = Number(params[queryVariable]);	// TODO: throw if not parseable as a number
				openFiscaSituation[VARNAMES_MAPPING[queryVariable]] = salaries;
			}
		}

		var openFiscaScenario = wrapSinglePerson(openFiscaSituation);

		openFiscaScenario.period = 'month:' + getCurrentMonthISO();

		return wrap(openFiscaScenario, [ 'salbrut', 'sali', 'salnet', 'sal_h_b' ]);
	},

	extractNet: function(openFiscaReply) {
		return openFiscaReply.value[0].individus[ID].salnet[getCurrentMonthISO()];
	}
}
