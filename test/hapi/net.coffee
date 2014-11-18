require 'mootools'
Enjoi = require 'enjoi'


spec = require '../../swagger.json'
pack = require '../../server.js'

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
		200:
			brut: 100
		400: {}
		409:
			brut		: 100
			imposable	: 100
		502:
			brut		: 'a string'
		(params, expectedCode) ->
			schema = Enjoi spec.paths[PATH][METHOD].responses[expectedCode].schema, { '#': spec }
			queryString = Object.toQueryString params
			query = Object.clone request

			query.url += '?' + queryString

			describe 'with parameters ' + queryString, ->
				it 'should reply ' + expectedCode, (done) ->
					server.inject query, (res) ->
						res.statusCode.should.equal Number(expectedCode)
						done()

				it 'should respect the schema', (done) ->
					server.inject query, (res) ->
						schema.validate res.payload, (error) ->
							done error
