var Test = require('tape');

var openFiscaMappings = require('../openFiscaMappings');


Test('OpenFisca mappings', function (t) {

	t.test('imposable', function(t) {
		t.plan(1);

		var data = openFiscaMappings.calculateNet({ imposable: 1444 }),
			expected = {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","sali":{"2014-11":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"legislation_url":"http://api.openfisca.fr/api/1/default-legislation","period":"month:2014-11"}],"variables":["salbrut","sali","salnet","sal_h_b"]};

		t.deepEqual(data, expected);

		t.end();
	});

	t.test('brut', function(t) {
		t.plan(1);

		var data = openFiscaMappings.calculateNet({ brut: 1444 }),
			expected = {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2014-11":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"legislation_url":"http://api.openfisca.fr/api/1/default-legislation","period":"month:2014-11"}],"variables":["salbrut","sali","salnet","sal_h_b"]};

		t.deepEqual(data, expected);

		t.end();
	});

});
