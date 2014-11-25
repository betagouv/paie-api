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

	individual.activite = 'Actif occupé';
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
		'period': 'month:' + getCurrentMonthISO(),
		'legislation_url': 'http://api.openfisca.fr/api/1/default-legislation'
	}
}

function getCurrentMonthISO() {
	var date = new Date(),
		month = date.getMonth() + 1;

	return date.getFullYear() + '-' + (month < 10 ? '0' : '') + month;
}

function makeMonthly(value) {
	var result = {};

	result[getCurrentMonthISO()] = value;

	return result;
}


module.exports = {
	getCurrentMonthISO: getCurrentMonthISO,

	calculateNet: function(params) {
		var openFiscaSituation = {
			'type_sal'	:'prive_cadre'
		};

		var VARNAMES_MAPPING = {
			brut		: 'salbrut',
			imposable	: 'sali'
		};

		for (var queryVariable in VARNAMES_MAPPING) {
			if (params[queryVariable] !== undefined) {	// allow 0
				var salaries = makeMonthly(Number(params[queryVariable]));
				openFiscaSituation[VARNAMES_MAPPING[queryVariable]] = salaries;
			}
		}

		return wrap(wrapSinglePerson(openFiscaSituation), [ 'salbrut', 'sali', 'salnet', 'sal_h_b' ]);
	},

	extractNet: function(openFiscaReply) {
		return openFiscaReply.value[0].individus[ID].salnet[getCurrentMonthISO()];
	},


	calculateFillon: function(params) {
		var taille = Number(params.taille);

		var openFiscaSituation = {
			'type_sal'	: params.type_sal,
			'salbrut'	: makeMonthly(Number(params.brut))
		};

		var COMPANY_SIZES = [
			{
				label	: 'Moins de 10 salariés',
				min		: 0
			},
			{
				label	: 'De 10 à 19 salariés',
				min		: 10
			},
			{
				label	: 'De 20 à 249 salariés',
				min		: 20
			},
			{
				label	: 'Plus de 250 salariés',
				min		: 250
			}
		];

		COMPANY_SIZES.some(function(size) {
			if (taille >= size.min)
				openFiscaSituation.taille_entreprise = size.label;
			else
				return true;	// stop iteration
		});

		return wrap(wrapSinglePerson(openFiscaSituation), [ 'alleg_fillon' ]);
	},

	extractFillon: function(openFiscaReply) {
		return openFiscaReply.value[0].individus[ID].alleg_fillon[getCurrentMonthISO()];
	}
}
