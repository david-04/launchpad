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

TSCONFIG_SRC_COMPONENTS=$(wildcard resources/tsconfig/02-components/tsconfig*.json)
TSCONFIG_SRC_COMPILATIONS=$(wildcard resources/tsconfig/03-compilations/tsconfig*.json)
TSCONFIG_SRC_SCRIPTS=scripts/build-tsconfig.sh scripts/build-tsconfig.js
TSCONFIG_SRC=$(TSCONFIG_SRC_COMPONENTS) $(TSCONFIG_SRC_COMPILATIONS) $(TSCONFIG_SRC_SCRIPTS)
TSCONFIG_TARGETS=$(patsubst resources/tsconfig/03-compilations/%,resources/tsconfig/%, $(TSCONFIG_SRC_COMPILATIONS)) \
				 .launchpad/tsconfig.default.json

TSCONFIG_DESCRIPTION=recreate the tsconfig.json templates
$(call doc.phony, tsconfig, $(TSCONFIG_DESCRIPTION))
.PHONY: tsconfig
tsconfig : $(TSCONFIG_TARGETS);

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC)
	scripts/build-tsconfig.sh \
		&& cp -f resources/tsconfig/tsconfig.node-application-esmodules.json .launchpad/tsconfig.default.json

$(call lp.tsc.extra-prerequisites, $(TSCONFIG_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# version information
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

$(call lp.tsc.enabled,             true)     # enable launchpad's built-in "tsc" and "compile" targets
$(call lp.tsc.extra-prerequisites,     )     # additional prerequisites (e.g. auto-generated source files)
$(call lp.tsc.before-hook,             )     # shell commands to run before compiling
$(call lp.tsc.after-hook,              )     # shell commands to run after compiling

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

# not implemented yet

$(call lp.bundler.enabled,             true)  # enable launchpad's built-in "bundle" target
$(call lp.bundler.extra-prerequisites,     )  # additional prerequisites
$(call lp.bundler.add-entry-points,        )  # entry points (relative to ./src) to be bundled
$(call lp.bundler.before-hook,             )  # shell commands to run before bundling
$(call lp.bundler.after-hook,              )  # shell commands to run after bundling

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

# not implemented yet

include .launchpad/Makefile.footer
