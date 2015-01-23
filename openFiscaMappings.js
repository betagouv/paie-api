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
		'period': 'month:' + getCurrentMonthISO()
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


var WORK_HOURS_IN_DAY = 7;


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
		var openFiscaSituation = {
			type_sal					: params.type_sal,
			salbrut						: makeMonthly(Number(params.brut)),
			effectif_entreprise			: Number(params.taille)
		};

		if (params.jours) {
			openFiscaSituation.heures_remunerees_volume	= Number(params.jours) * WORK_HOURS_IN_DAY;

			if (params.heuresSup)
				openFiscaSituation.heures_remunerees_volume += Number(params.heuresSup);

			openFiscaSituation.heures_remunerees_volume = Math.round(openFiscaSituation.heures_remunerees_volume);
		}

		if (params.heuresNonTravaillees)
			openFiscaSituation.heures_non_remunerees_volume = Math.round(params.heuresNonTravaillees);

		return wrap(wrapSinglePerson(openFiscaSituation), [ 'allegement_fillon' ]);
	},

	extractFillon: function(openFiscaReply) {
		return openFiscaReply.value[0].individus[ID].allegement_fillon[getCurrentMonthISO()];
	}
}
