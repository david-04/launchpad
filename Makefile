include .launchpad/Makefile.header

#-----------------------------------------------------------------------------------------------------------------------
# Default target
#-----------------------------------------------------------------------------------------------------------------------

autorun : compile

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

help : lp.help
	$(info ${}  tsconfig ........ $(TSCONFIG_DESCRIPTION))
	$(info ${}  version ......... $(VERSION_INFO_DESCRIPTION))

#-----------------------------------------------------------------------------------------------------------------------
# tsconfig
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
# Version information
#-----------------------------------------------------------------------------------------------------------------------

VERSION_INFO_SRC_DATA=CHANGELOG.md
VERSION_INFO_SRC_SCRIPTS=$(patsubst %, scripts/%.sh, update-version-information get-copyright-years get-version-number)
VERSION_INFO_SRC=$(VERSION_INFO_SRC_DATA) $(VERSION_INFO_SRC_SCRIPTS)
VERSION_INFO_TARGETS=LICENSE package.json dist/package.json src/resources/version-information.ts

VERSION_INFO_DESCRIPTION=update the version number
$(call doc.phony, version, VERSION_INFO_DESCRIPTION)
.PHONY: version
version version-info version-information : $(VERSION_INFO_TARGETS)

$(VERSION_INFO_TARGETS) : $(VERSION_INFO_SRC)
	scripts/update-version-information.sh

$(call lp.tsc.extra-prerequisites, $(VERSION_INFO_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

# $(call lp.bundler.enabled,             true)  # enable launchpad's built-in "bundle" target
# $(call lp.bundler.extra-prerequisites,     )  # additional prerequisites
# # $(call lp.bundler.add-entry-points,        )  # entry points (relative to ./src) to be bundled
# $(call lp.bundler.before-hook,             )  # shell commands to run before bundling
# $(call lp.bundler.after-hook,              )  # shell commands to run after bundling

# $(call lp.bundler.add-bundle, scripts/launchpad-cli, launchpad-cli)
# $(call lp.bundler.bundle, scripts/launchpad-cli, launpad-cli)

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
