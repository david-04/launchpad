include .launchpad/Makefile.header




$(PRESERVE_OUTPUT)

# #-----------------------------------------------------------------------------------------------------------------------
# # Default target
# #-----------------------------------------------------------------------------------------------------------------------

# autorun : help;

# autorun.editor: compile;

# #-----------------------------------------------------------------------------------------------------------------------
# # Help
# #-----------------------------------------------------------------------------------------------------------------------

# $(call lp.help.add-phony-target, run, ................ compile and run launchpad)
# $(call lp.help.add-phony-target, tsconfig, ........... assemble the tsconfig.json templates)
# $(call lp.help.add-phony-target, version, ............ update the version numbers and copyright years)

# #-----------------------------------------------------------------------------------------------------------------------
# # Create tsconfig.json templates
# #-----------------------------------------------------------------------------------------------------------------------

# TSCONFIG_SRC_DIRECTORIES=resources/tsconfig/02-facets resources/tsconfig/03-compilations
# TSCONFIG_SRC_JSON=$(wildcard $(foreach dir, $(TSCONFIG_SRC_DIRECTORIES), $(dir)/tsconfig*.json))
# TSCONFIG_SRC=$(TSCONFIG_SRC_DIRECTORIES) $(TSCONFIG_SRC_JSON)
# TSCONFIG_TARGETS=src/resources/tsconfig-templates.ts .launchpad/tsconfig.default.json

# tsconfig : $(TSCONFIG_TARGETS);

# $(TSCONFIG_TARGETS) : $(TSCONFIG_SRC)
# 	scripts/build-tsconfig.sh

# $(call lp.tsc.add-extra-prerequisites, $(TSCONFIG_TARGETS))

# #-----------------------------------------------------------------------------------------------------------------------
# # Update version information
# #-----------------------------------------------------------------------------------------------------------------------

# UPDATE_VERSION_INFO_SRC=CHANGELOG.md scripts/update-version-information.sh scripts/get-copyright-years.sh scripts/get-version-number.sh
# UPDATE_VERSION_INFO_TARGETS=LICENSE package.json dist/package.json src/resources/version-information.ts

# version : $(UPDATE_VERSION_INFO_TARGETS)

# $(UPDATE_VERSION_INFO_TARGETS) : $(UPDATE_VERSION_INFO_SRC)
# 	scripts/update-version-information.sh

# $(call lp.tsc.add-extra-prerequisites, $(UPDATE_VERSION_INFO_TARGETS))

# #-----------------------------------------------------------------------------------------------------------------------
# # Compile
# #-----------------------------------------------------------------------------------------------------------------------

# # Use default rules

# #-----------------------------------------------------------------------------------------------------------------------
# # Bundle
# #-----------------------------------------------------------------------------------------------------------------------

# # $(call lp.bundle.enable-source-maps)
# # $(call lp.bundle.enable-inline-sources)

# $(call lp.bundle.add-bundle, scripts/launchpad-lib, launchpad-lib)

# #-----------------------------------------------------------------------------------------------------------------------
# # Release
# #-----------------------------------------------------------------------------------------------------------------------

# # not implemented yet

# #-----------------------------------------------------------------------------------------------------------------------
# # Reformat
# #-----------------------------------------------------------------------------------------------------------------------

# $(call lp.format.exclude-files, src/resources/tsconfig-templates.ts)
# $(call lp.format.exclude-files, resources/tsconfig, tsconfig*.json)

# #-----------------------------------------------------------------------------------------------------------------------
# # Uplift
# #-----------------------------------------------------------------------------------------------------------------------

# #-----------------------------------------------------------------------------------------------------------------------
# # Clean
# #-----------------------------------------------------------------------------------------------------------------------

# # $(call lp.clean.add-bundles)
# # $(call lp.clean.add-bundle-output-directory)
# $(call lp.clean.add-tsc-output-directory)
# $(call lp.clean.add-files, resources/tsconfig/tsconfig.*.json)

# #-----------------------------------------------------------------------------------------------------------------------
# # Run
# #-----------------------------------------------------------------------------------------------------------------------

# run : $(call lp.tsc.get-targets)
# 	node build/scripts/launchpad-postinstall.js

# #-----------------------------------------------------------------------------------------------------------------------
# # Built-in default targets
# #-----------------------------------------------------------------------------------------------------------------------

# include .launchpad/Makefile.footer
