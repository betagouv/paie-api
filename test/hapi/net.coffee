Enjoi = require 'enjoi'


pack = require '../../server.js'


describe 'get /net', ->
	server = null

	before (done) ->
		pack.start (error, pack) ->
			server = pack.servers[0]
			done()

	after	pack.stop

	query = {
		method: 'get',
		url: '/api/net'
	}

	describe 'without parameter', ->
		responseSchema = Enjoi(require('../../swagger.json')["paths"]["/net"]["get"]["responses"]["400"]["schema"], {
			'#': require('../../swagger.json')
		})

		it 'should reply 400', (done) ->
			server.inject query, (res) ->
				res.statusCode.should.equal 400
				done()

		it 'should respect the schema', (done) ->
			server.inject query, (res) ->
				responseSchema.validate res.payload, (error) ->
					done error
