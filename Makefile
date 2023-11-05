include .launchpad/Makefile.header

#-----------------------------------------------------------------------------------------------------------------------
# .launchpad/Makefile.documentation
#-----------------------------------------------------------------------------------------------------------------------

autorun : tsc;

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, tsconfig, ........... assemble the tsconfig.json templates)
$(call lp.help.add-phony-target, version, ............ update version number and copyright years)

#-----------------------------------------------------------------------------------------------------------------------
# Embed tsconfig.json templates
#-----------------------------------------------------------------------------------------------------------------------

TSCONFIG_SRC_DIRECTORIES = resources/tsconfig/02-facets resources/tsconfig/03-compilations
TSCONFIG_SRC_JSON        = $(wildcard $(foreach dir, $(TSCONFIG_SRC_DIRECTORIES), $(dir)/tsconfig*.json))
TSCONFIG_SRC             = $(TSCONFIG_SRC_DIRECTORIES) $(TSCONFIG_SRC_JSON)
TSCONFIG_TARGETS         = src/resources/tsconfig-templates.ts .launchpad/tsconfig.default.json

tsconfig : $(TSCONFIG_TARGETS);

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC) ./bin/build-tsconfig.sh  ./bin/build-tsconfig.js
	./bin/build-tsconfig.sh

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
$(call lp.format.exclude, src/resources/tsconfig-templates.ts)

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

init :
	ts-node-esm src/debug.ts init \
							 --project-name=test \
							 --artifact=app \
							 --runtime=cli \
							 --module-system=esm \
							 --bundler=disabled \
							 --dts-bundler=disabled \
							 --formatter=prettier \
							 --package-manager=yarn \
							 --src-dir=src \
							 --web-app-dir=dist \
							 --tsc-out-dir=dist \

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
