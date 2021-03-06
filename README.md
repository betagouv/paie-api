Paie API
========

The Paie API calculates all the taxes applicable to a salary in France.

It takes as inputs the description of an employer, an employee and her work hours in a given month, and outputs a breakdown of all applicable taxes, their base and actual value.

> Ce projet offre une API pour simplifier les tâches administratives liées à l'édition de fiches de paie dans le système socio-fiscal français.
>
> Pour plus de détails, voyez [embauche.sgmap.fr](http://embauche.sgmap.fr/).


Aims
----

Provide an accurate, always up-to-date, detailed breakdown of all taxes applicable to a salary under French law.


Status
------

**THE PAIE API AS AN INDEPENDENT SOFTWARE PACKAGE IS DEPRECATED.**

It has been superseded by the `/formula` endpoint in [OpenFisca](http://www.openfisca.fr), a global simulator of the French tax-benefit system. See its [API documentation](http://embauche.sgmap.fr/api/doc/).


Architecture
------------

### Spec

**To obtain a JSON Swagger file, run `npm compile`.**

Paie is a [Swagger](http://swagger.io)-compliant RESTful API. It respects the [Swagger 2.0 spec](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).

You don't have to know what Swagger is to use this API, but you really should have a quick look at it. Defining an API through a standard allows for a lot of nice [automated client generation and validation](https://github.com/swagger-api/swagger-spec#see-it-in-action).

The API is defined in `swagger.yaml`.

### Server

**To start the server, run `npm start`.**

The API is served by a [Hapi](http://hapijs.com) server on [Node](http://nodejs.org).

Routing and parameter validation is done automatically from the Swagger definition thanks to [`swaggerize-hapi`](https://github.com/krakenjs/swaggerize-hapi). Handlers for each route are defined in `hapi/handlers`, and respect the layout of the API, conforming with `swaggerize-hapi`.

Handlers mostly route simple Paie API requests to more complex OpenFisca requests, and parse the replies back to remove most of the bloat. This part is externalized in the `openFiscaMappings` files.

The server configuration is done in `server.js`, exporting a Hapi server (actually, a [server pack](http://hapijs.com/tutorials/packs), but that doesn't matter much), allowing you to programmatically start and stop it.

`index.js` immediately starts this server.

### Tests

**To run the tests, run `npm test`.**

Tests are written in the `test` folder with [`mocha`](http://mochajs.org). Options needed to run are specified in the `mocha.opts` file.

Tests are written in CoffeeScript. It is a specific use-case where this language seriously improves the readability of repetitive, deeply-nested instructions.


### Deployment

**To deploy to your server, clone the repo or copy the source code, `npm install && npm start`.**

Install pm2, then use ```./deploy.sh```.



- - - - - -

Governance
----------

The Paie API is being developed by a State Startup within the French government. Its main aim is to simplify the edition of payslips. It is free open-source software, and you are welcome to contribute to it.


License
-------

The code for this software is distributed under an [AGPL license](http://www.gnu.org/licenses/agpl.html).

That means you may call the public webservice API as you wish, but may integrate the source code itself only within similarly free open-source software. If you make any changes to the code, even if it is not redistributed and provided only as a webservice, you have to share them back with the community.

Contact the authors if you have any specific need or question regarding licensing.
