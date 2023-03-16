include .launchpad/Makefile.header

#-----------------------------------------------------------------------------------------------------------------------
# Default target
#-----------------------------------------------------------------------------------------------------------------------

autorun : compile

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

# $(call lp.help.add-target,       test, ............... description)
# $(call lp.help.add-target,       test2, .............. description)
# $(call lp.help.add-phony-target, test3, .............. description)


#-----------------------------------------------------------------------------------------------------------------------
# Create tsconfig.json templates
#-----------------------------------------------------------------------------------------------------------------------

TSCONFIG_SRC=$(wildcard resources/tsconfig/02-facets/tsconfig*.json) \
			 $(wildcard resources/tsconfig/03-compilations/tsconfig*.json) \
		     scripts/build-tsconfig.sh scripts/build-tsconfig.js
TSCONFIG_TARGETS=src/resources/tsconfig-templates.ts .launchpad/tsconfig.default.json

TSCONFIG_DESCRIPTION=assemble the tsconfig.json templates
$(call doc.phony, tsconfig, $(TSCONFIG_DESCRIPTION))
.PHONY: tsconfig
tsconfig : $(TSCONFIG_TARGETS);

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC)
	scripts/build-tsconfig.sh

$(call lp.tsc.extra-prerequisites, $(TSCONFIG_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Update version information
#-----------------------------------------------------------------------------------------------------------------------

UPDATE_VERSION_INFO_SRC=CHANGELOG.md scripts/update-version-information.sh scripts/get-copyright-years.sh scripts/get-version-number.sh
UPDATE_VERSION_INFO_TARGETS=LICENSE package.json dist/package.json src/resources/version-information.ts

UPDATE_VERSION_INFO_DESCRIPTION=update the version number
$(call doc.phony, version, UPDATE_VERSION_INFO_DESCRIPTION)
.PHONY: version
version version-info version-information : $(UPDATE_VERSION_INFO_TARGETS)

$(UPDATE_VERSION_INFO_TARGETS) : $(UPDATE_VERSION_INFO_SRC)
	scripts/update-version-information.sh

$(call lp.tsc.extra-prerequisites, $(UPDATE_VERSION_INFO_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

# Use default rules

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

# $(call lp.bundler.add-bundle, scripts/launchpad-cli, launchpad)


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

include .launchpad/Makefile.footer
