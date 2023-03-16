include .launchpad/Makefile.header

#-----------------------------------------------------------------------------------------------------------------------
# Default target
#-----------------------------------------------------------------------------------------------------------------------

autorun : compile

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, tsconfig, ........... assemble the tsconfig.json templates)
$(call lp.help.add-phony-target, version, ............ update the version numbers and copyright years)

#-----------------------------------------------------------------------------------------------------------------------
# Create tsconfig.json templates
#-----------------------------------------------------------------------------------------------------------------------

TSCONFIG_SRC_DIRECTORIES=resources/tsconfig/02-facets resources/tsconfig/03-compilations
TSCONFIG_SRC_JSON=$(wildcard $(foreach dir, $(TSCONFIG_SRC_DIRECTORIES), $(dir)/tsconfig*.json))
TSCONFIG_SRC=$(TSCONFIG_SRC_DIRECTORIES) $(TSCONFIG_SRC_JSON)
TSCONFIG_TARGETS=src/resources/tsconfig-templates.ts .launchpad/tsconfig.default.json

tsconfig : $(TSCONFIG_TARGETS);

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC)
	scripts/build-tsconfig.sh

$(call lp.tsc.add-extra-prerequisites, $(TSCONFIG_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Update version information
#-----------------------------------------------------------------------------------------------------------------------

UPDATE_VERSION_INFO_SRC=CHANGELOG.md scripts/update-version-information.sh scripts/get-copyright-years.sh scripts/get-version-number.sh
UPDATE_VERSION_INFO_TARGETS=LICENSE package.json dist/package.json src/resources/version-information.ts

version : $(UPDATE_VERSION_INFO_TARGETS)

$(UPDATE_VERSION_INFO_TARGETS) : $(UPDATE_VERSION_INFO_SRC)
	scripts/update-version-information.sh

$(call lp.tsc.add-extra-prerequisites, $(UPDATE_VERSION_INFO_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

# Use default rules

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.bundle.enable-source-maps)
# $(call lp.bundle.enable-inline-sources)

$(call lp.bundle.add-bundle, scripts/launchpad-lib, launchpad-lib)

#-----------------------------------------------------------------------------------------------------------------------
# release
#-----------------------------------------------------------------------------------------------------------------------

# not implemented yet

#-----------------------------------------------------------------------------------------------------------------------
# Reformat
#-----------------------------------------------------------------------------------------------------------------------

# not implemented yet

#-----------------------------------------------------------------------------------------------------------------------
# Uplift
#-----------------------------------------------------------------------------------------------------------------------

#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

# $(call lp.clean.add-files, resources/tsconfig/tsconfig.*.json)

# $(call lp.clean.add-bundles)
# $(call lp.clean.add-tsc-output-directory)
# $(call lp.clean.add-bundle-output-directory)
# $(call lp.clean.add-files,xxx)

# $(call lp.clean.add-files)

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
