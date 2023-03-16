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

TSCONFIG_SRC=$(wildcard resources/tsconfig/02-facets/tsconfig*.json) \
			 $(wildcard resources/tsconfig/03-compilations/tsconfig*.json) \
		     scripts/build-tsconfig.sh scripts/build-tsconfig.js
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
$(call lp.bundle.enable-inline-sources)

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
# Clean
#-----------------------------------------------------------------------------------------------------------------------

CLEAN=resources/tsconfig/tsconfig.*.json

clean :
    ifneq "$(wildcard $(CLEAN))" ""
	rm -rf $(CLEAN)
    endif

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
