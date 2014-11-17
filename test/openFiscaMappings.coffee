should = require 'should'

mapper = require '../openFiscaMappings'


describe 'OpenFisca mappings', ->
	it 'should properly wrap imposable', ->
		mapper.calculateNet({ imposable: 1444 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","sali":{"2014-11":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"legislation_url":"http://api.openfisca.fr/api/1/default-legislation","period":"month:2014-11"}],"variables":["salbrut","sali","salnet","sal_h_b"]}

	it 'should properly wrap brut', ->
		mapper.calculateNet({ brut: 1444 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2014-11":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"legislation_url":"http://api.openfisca.fr/api/1/default-legislation","period":"month:2014-11"}],"variables":["salbrut","sali","salnet","sal_h_b"]}
