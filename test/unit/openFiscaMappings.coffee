require 'mootools'
require 'mootools-more'
mapper = require '../../openFiscaMappings'


describe 'OpenFisca mappings', ->
	it 'should properly wrap imposable', ->
		mapper.calculateNet({ imposable: 1444 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","sali":{"2015-01":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["salbrut","sali","salnet","sal_h_b"]}

	it 'should properly wrap brut', ->
		mapper.calculateNet({ brut: 1444 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2015-01":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["salbrut","sali","salnet","sal_h_b"]}

	describe 'taille', ->
		it 'should be properly renamed', ->
			mapper.calculateFillon({ brut: 1444, taille: 15, type_sal: 'prive_cadre' }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2015-01":1444},"type_sal":"prive_cadre","effectif_entreprise":15}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["allegement_fillon"]}

	describe 'jours', ->
		it 'should be properly mapped to hours', ->
			mapper.calculateFillon({ brut: 1444, taille: 15, type_sal: 'prive_cadre', jours: 10 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2015-01":1444},"type_sal":"prive_cadre","effectif_entreprise":15,"heures_remunerees_volume":70}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["allegement_fillon"]}

	describe 'heuresSup', ->
		it 'should be added to days', ->
			mapper.calculateFillon({ brut: 1444, taille: 15, type_sal: 'prive_cadre', jours: 10, heuresSup: 5 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2015-01":1444},"type_sal":"prive_cadre","effectif_entreprise":15,"heures_remunerees_volume":75}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["allegement_fillon"]}

	describe 'heuresNonTravaillees', ->
		it 'should be renamed', ->
			mapper.calculateFillon({ brut: 1444, taille: 15, type_sal: 'prive_cadre', heuresNonTravaillees: 5 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2015-01":1444},"type_sal":"prive_cadre","effectif_entreprise":15,"heures_non_remunerees_volume":5}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["allegement_fillon"]}

		it 'should be translated to an int', ->
			mapper.calculateFillon({ brut: 1444, taille: 15, type_sal: 'prive_cadre', heuresNonTravaillees: 5.2 }).should.eql {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","salbrut":{"2015-01":1444},"type_sal":"prive_cadre","effectif_entreprise":15,"heures_non_remunerees_volume":5}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["allegement_fillon"]}

	describe 'extractNet', ->
		input = {"apiVersion":"1.0","method":"/api/1/calculate","params":{"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","type_sal":"prive_cadre","sali":{"2015-01":1000}}],"menages":[{"personne_de_reference":"ind0"}]},"period":"month:2015-01"}],"variables":["salbrut","sali","salnet","sal_h_b"]},"suggestions":{"scenarios":{"0":{"test_case":{"individus":{"ind0":{"birth":"1974-01-01"}}}}}},"url":"http://api.openfisca.fr/api/1/calculate","value":[{"familles":{"0":{"parents":["ind0"]}},"foyers_fiscaux":{"0":{"declarants":["ind0"]}},"individus":{"ind0":{"sali":{"2015-01":1000,"year:2015-01":1000},"activite":0,"type_sal":1,"birth":"1974-01-01","salnet":{"2015-01":80.39421844482422,"year:2015-01":964.7306518554688},"salbrut":{"2015-01":101.74107360839844,"year:2015-01":1237.8497314453125},"sal_h_b":{"2015-01":0.05667685344815254,"year:2015-01":0.6801222562789917}}},"menages":{"0":{"personne_de_reference":"ind0"}}}]}

		it 'should properly extract net', ->
			mapper.extractNet(input).should.equal 80.39421844482422

	describe 'getCurrentMonthISO', ->
		it 'should output the current month in YYYY-MM format', ->
			mapper.getCurrentMonthISO().should.equal (new Date()).format('%Y-%m')
