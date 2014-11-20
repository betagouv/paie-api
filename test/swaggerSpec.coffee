fs		= require 'fs'

Yaml	= require 'js-yaml'
Swagger	= require('swagger-tools').specs.v2

should	= require 'should'

FILE_PATH = __dirname + '/../swagger.yaml'


describe 'Swagger spec', ->
	spec = null

	it 'should be valid YAML', (done) ->
		fs.readFile FILE_PATH, (err, data) ->
			if err
				return done err

			spec = Yaml.safeLoad data
			done()

	it 'should be valid Swagger', ->
		should(Swagger.validate spec).not.be.ok	# https://github.com/apigee-127/swagger-tools/blob/master/docs/API.md#validaterlorso-apideclarations
