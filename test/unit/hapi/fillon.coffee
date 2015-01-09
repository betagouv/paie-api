fs		= require 'fs'

require 'mootools'
Enjoi	= require 'enjoi'
Yaml	= require 'js-yaml'


spec = Yaml.safeLoad fs.readFileSync 'swagger.yaml'
pack = require '../../../server.js'

PATH = '/fillon'
METHOD = 'get'


describe 'get ' + PATH, ->
	this.timeout 10 * 1000	# leave some time for slow connections and slow OpenFisca server

	server = null
	request =
		method	: METHOD
		url		: spec.basePath + PATH

	before (done) ->
		pack.start (error, pack) ->
			server = pack.servers[0]
			done()

	after	pack.stop

	Object.each
		'brut=1000&categorie=prive_non_cadre&taille=20': 200
		'brut=1000&categorie=prive_non_cadre&taille=20&jours=10': 200
		'brut=1000&categorie=prive_non_cadre&taille=20&jours=10&heuresSup=4': 200
		'brut=1000&categorie=prive_non_cadre&taille=20&heuresNonTravaillees=4': 200
		'brut=1000': 400
		'bru=1000&categorie=prive_non_cadre&taille=20': 400
		(expectedCode, queryString) ->
			schema = Enjoi spec.paths[PATH][METHOD].responses[expectedCode].schema, { '#': spec }
			query = Object.clone request

			query.url += '?' + queryString

			describe 'with parameters ' + queryString, ->
				it 'should reply ' + expectedCode, (done) ->
					server.inject query, (res) ->
						res.statusCode.should.equal expectedCode
						done()

				it 'should respect the schema', (done) ->
					server.inject query, (res) ->
						schema.validate res.payload, (error) ->
							done error
