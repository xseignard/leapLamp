MOCHA="node_modules/.bin/mocha"
_MOCHA="node_modules/.bin/_mocha"
JSHINT="node_modules/.bin/jshint"
ISTANBUL="node_modules/.bin/istanbul"

TESTS=$(shell find test/ -name "*.test.js")

clean:
	rm -rf reports

test:
	$(MOCHA) -R spec $(TESTS)
	
jshint:
	$(JSHINT) src test

coverage:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(ISTANBUL) cover --dir ./reports $(_MOCHA) -- -R spec $(TESTS)

run: 
	node src/app.js

.PHONY: clean test jshint coverage run
