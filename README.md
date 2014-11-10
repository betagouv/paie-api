Paie API
========

The Paie API calculates all the taxes applicable to a salary in France.

It takes as inputs the description of an employer, an employee and her work hours in a given month, and outputs a breakdown of all applicable taxes, their base and actual value.

[![Build Status](https://travis-ci.org/sgmap/paie-api.svg?branch=master)](https://travis-ci.org/sgmap/paie-api)


Aims
----

Provide an accurate, always up-to-date, detailed breakdown of all taxes applicable to a salary under French law.


Status
------

**The Paie API is currently in discovery stage.**

It is a frequently iterated-over prototype and you should not rely on any parts of its specification.

However, feel free to comment and send feedback or advice at any time. Your input will be useful to direct the following iterations.


Stack
-----

Paie is a [Swagger](http://swagger.io)-compliant RESTful API. It respects the [Swagger 2.0 spec](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).

You don't have to know what Swagger is to use this API, but you really should have a quick look at it. Defining an API through a standard allows for a lot of nice [automated client generation and validation](https://github.com/swagger-api/swagger-spec#see-it-in-action).

- - - - - -

Governance
----------

The Paie API is being developed by a State Startup within the French government. Its main aim is to simplify the edition of payslips. It is free open-source software, and you are welcome to contribute to it.


License
-------

The code for this software is distributed under an [AGPL license](http://www.gnu.org/licenses/agpl.html).

That means you may call the public webservice API as you wish, but may integrate the source code itself only within similarly free open-source software. If you make any changes to the code, even if it is not redistributed and provided only as a webservice, you have to share them back with the community.

Contact the authors if you have any specific need or question regarding licensing.
