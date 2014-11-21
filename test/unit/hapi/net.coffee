fs		= require 'fs'

require 'mootools'
Enjoi	= require 'enjoi'
Yaml	= require 'js-yaml'


spec = Yaml.safeLoad fs.readFileSync 'swagger.yaml'
pack = require '../../../server.js'

PATH = '/net'
METHOD = 'get'


describe 'get ' + PATH, ->
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
		'brut=10': 200
		'imposable=10': 200
		'': 400
		'brut=a_string': 400
		'brut=': 400
		'brut=10&imposable=10': 409
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
