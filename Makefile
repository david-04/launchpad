include .launchpad/Makefile.header

#-----------------------------------------------------------------------------------------------------------------------
# .launchpad/Makefile.documentation
#-----------------------------------------------------------------------------------------------------------------------

autorun : tsc;

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, embed, .............. embed resources)
$(call lp.help.add-phony-target, tsconfig, ........... assemble the tsconfig.json templates)
$(call lp.help.add-phony-target, version, ............ update version number and copyright years)
$(call lp.help.add-phony-target, test.init, .......... run debug init)
$(call lp.help.add-phony-target, test.help, .......... run debug help)
$(call lp.help.add-phony-target, test.postinsatll, ... run debug postinstall)
$(call lp.help.add-phony-target, test.uplift, ........ run debug uplift)

#-----------------------------------------------------------------------------------------------------------------------
# Embed tsconfig.json templates
#-----------------------------------------------------------------------------------------------------------------------

TSCONFIG_SRC_DIRECTORIES = resources/tsconfig/02-facets resources/tsconfig/03-compilations
TSCONFIG_SRC_JSON        = $(wildcard $(foreach dir, $(TSCONFIG_SRC_DIRECTORIES), $(dir)/tsconfig*.json))
TSCONFIG_SRC             = $(TSCONFIG_SRC_JSON)
TSCONFIG_TARGETS         = src/resources/embedded-tsconfig.ts .launchpad/tsconfig.default.json

tsconfig : $(TSCONFIG_TARGETS);

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC) ./bin/embed-tsconfig.sh  ./bin/embed-tsconfig.js
	./bin/embed-tsconfig.sh

#-----------------------------------------------------------------------------------------------------------------------
# Embed assets
#-----------------------------------------------------------------------------------------------------------------------

EMBEDDED_ASSETS_SOURCE = $(call lp.fn.wildcard, .launchpad resources/templates, *)
EMBEDDED_ASSETS_TARGET = src/resources/embedded-assets.ts

embed : $(EMBEDDED_ASSETS_TARGET)

$(EMBEDDED_ASSETS_TARGET) : $(EMBEDDED_ASSETS_SOURCE) bin/embed-assets.sh  bin/embed-assets.js $(TSCONFIG_TARGETS)
	./bin/embed-assets.sh $@ $(sort $(patsubst bin/%, ,$(EMBEDDED_ASSETS_SOURCE)))

#-----------------------------------------------------------------------------------------------------------------------
# Update version information
#-----------------------------------------------------------------------------------------------------------------------

UPDATE_VERSION_INFO_SRC		= CHANGELOG.md bin/update-version-information.sh bin/get-copyright-years.sh bin/get-version-number.sh
UPDATE_VERSION_INFO_TARGETS	= LICENSE package.json dist/package.json src/resources/version-information.ts

version : $(UPDATE_VERSION_INFO_TARGETS);

$(UPDATE_VERSION_INFO_TARGETS) : $(UPDATE_VERSION_INFO_SRC)
	./bin/update-version-information.sh

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.tsc.add-extra-prerequisites, $(TSCONFIG_TARGETS))
$(call lp.tsc.add-extra-prerequisites, $(EMBEDDED_ASSETS_TARGET))
$(call lp.tsc.add-extra-prerequisites, $(UPDATE_VERSION_INFO_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.bundle.add-bundle, src/launchpad.ts, dist/launchpad.mjs)

#-----------------------------------------------------------------------------------------------------------------------
# Format
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.format.exclude, resources/tsconfig/01-default)
$(call lp.format.exclude, resources/tsconfig/02-facets)
$(call lp.format.exclude, src/resources/embedded-assets.ts)
$(call lp.format.exclude, src/resources/embedded-tsconfig.ts)

#-----------------------------------------------------------------------------------------------------------------------
# Release
#-----------------------------------------------------------------------------------------------------------------------

# not implemented yet

#-----------------------------------------------------------------------------------------------------------------------
# Uplift
#-----------------------------------------------------------------------------------------------------------------------

# not implemented yet

#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.clean.tsc-output)
$(call lp.clean.bundles)

#-----------------------------------------------------------------------------------------------------------------------
# Run
#-----------------------------------------------------------------------------------------------------------------------

# run : $(LP_TSC_TARGETS)
# 	node build/bin/launchpad-postinstall.js

test.help : run-test.help;
test.init : run-test.init;
test.postinstall : run-test.postinstall;
test.uplift : run-test.uplift;

run-test.% :  $(LP_TSC_TARGETS)
	echo Running launchpad $*...
	ts-node-esm build/test.js $*

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
