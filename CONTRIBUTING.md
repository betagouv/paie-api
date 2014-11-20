**First of all, thank you very much for wanting to contribute to this project!**

Here are a few guidelines to ensure your contributions will be merged to the mainline.

If you have any doubt about where your code should fit, have a look at the [architecture](https://github.com/sgmap/paie-api#architecture). If that doesn't answer your concern, open an issue to discuss!  :)


Tests
-----

If you found a bug, add a test case for it. If you add a feature, cover it with tests.

Tests are run with `npm test`.


Language
--------

The development language is English. All comments and documentation should be written in English, so that we don't end up with “franglais” methods, and so we can share our learnings with developers around the world.

However, the domain language is French. We consider each tax, collecting organism and French regulation as a domain-specific term. In the same fashion, well-known abbreviations of these domain-specific terms are accepted.

### Example

Where you would write something like `getRectangle` in a drawing app, you should write `getCSG` (“CSG” being a French tax). it is a domain-specific term and may be used directly.

Where you would write something like `getRectangleArea` in a drawing app, you should write `getCSGbase`. “assiette” should be translated to “base”, as it is not a domain-specific term but a technical term that does not have a unique meaning in the given context.
