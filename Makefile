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

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC) ./bin/embed-tsconfig.sh  ./bin/embed-tsconfig.mjs
	./bin/embed-tsconfig.sh

#-----------------------------------------------------------------------------------------------------------------------
# Embed assets
#-----------------------------------------------------------------------------------------------------------------------

EMBEDDED_ASSETS_SOURCE = $(filter-out .launchpad/settings.cfg, $(call lp.fn.wildcard, .launchpad resources/templates, *))
EMBEDDED_ASSETS_TARGET = src/resources/embedded-assets.ts

embed : $(EMBEDDED_ASSETS_TARGET)

$(EMBEDDED_ASSETS_TARGET) : $(EMBEDDED_ASSETS_SOURCE) bin/embed-assets.sh  bin/embed-assets.mjs $(TSCONFIG_TARGETS)
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

$(call lp.bundle.add, src/launchpad-cli.ts, dist/launchpad.js, minify)

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
# Test
#-----------------------------------------------------------------------------------------------------------------------

TEST_DIRECTORY=./test
TEST_PATH_TO_DIST_DIRECTORY=../dist

CREATE_AND_GO_TO_TEST_DIRECTORY=$(if $(wildcard $(TEST_DIRECTORY)/$(strip $(1))), \
                                    rm -rf "$(TEST_DIRECTORY)/$(strip $(1))", \
                                    echo -n "" \
                                ) \
                             && mkdir -p "$(TEST_DIRECTORY)/$(strip $(1))" \
	                         && cd "$(TEST_DIRECTORY)/$(strip $(1))"

ADD_TEST=$(eval $(call TEST_RULE,$(strip $(1)),$(strip $(2))))

define TEST_RULE
.PHONY: test.$(strip $(1))
$(eval TEST_TARGETS+= test.$(strip $(1)))
test.$(strip $(1)) : $(LP_PREREQUISITE_BUNDLE)
	   echo "------------------------------------------------------------------------------------------------------------------------" \
	&& echo Running test for $(strip $(1)) \
	&& echo "------------------------------------------------------------------------------------------------------------------------" \
	&& echo "" \
	&& $(call CREATE_AND_GO_TO_TEST_DIRECTORY, $(1)) \
	&& node "../$(TEST_PATH_TO_DIST_DIRECTORY)/launchpad.js" $(2)
endef

DEFAULT_OPTIONS  = --auto-selected-dependencies= \
                   --bundler-out-dir=default \
                   --create-debug-module=true \
                   --create-project-template=true \
                   --create-makefile=true \
                   --create-vscode-settings=true \
                   --formatter=prettier \
                   --install-dev-dependencies=false \
                   --installation-mode=global \
                   --optional-dependencies= \
                   --package-manager=npm \
                   --preselected-dependencies= \
                   --project-name=default \
                   --src-dir=default \
                   --tab-size=4 \
                   --tsc-out-dir=default \
                   --uplift-dependencies=true \
                   --web-app-dir=default
CLI              = --runtime=cli
WEB              = --runtime=web
APP              = --artifact=app
LIB              = --artifact=lib
ESM              = --module-system=esm
CJS              = --module-system=cjs
BUNDLER_DISABLED = --bundler=disabled --dts-bundler=disabled
BUNDLER_APP      = --bundler=default --dts-bundler=disabled
BUNDLER_LIB      = --bundler=default --dts-bundler=default

AND_MAKE        = && echo "" && make-plain --silent && echo ""

$(call ADD_TEST, cli-app-cjs         , init $(DEFAULT_OPTIONS) $(CLI) $(APP) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, cli-app-cjs-bundled , init $(DEFAULT_OPTIONS) $(CLI) $(APP) $(CJS) $(BUNDLER_APP)      $(AND_MAKE) )
$(call ADD_TEST, cli-app-esm         , init $(DEFAULT_OPTIONS) $(CLI) $(APP) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, cli-app-esm-bundled , init $(DEFAULT_OPTIONS) $(CLI) $(APP) $(ESM) $(BUNDLER_APP)      $(AND_MAKE) )
$(call ADD_TEST, cli-lib-cjs         , init $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, cli-lib-cjs-bundled , init $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(CJS) $(BUNDLER_LIB)      $(AND_MAKE) )
$(call ADD_TEST, cli-lib-esm         , init $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, cli-lib-esm-bundled , init $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(ESM) $(BUNDLER_LIB)      $(AND_MAKE) )
$(call ADD_TEST, web-app-cjs         , init $(DEFAULT_OPTIONS) $(WEB) $(APP) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, web-app-cjs-bundled , init $(DEFAULT_OPTIONS) $(WEB) $(APP) $(CJS) $(BUNDLER_APP)      $(AND_MAKE) )
$(call ADD_TEST, web-app-esm         , init $(DEFAULT_OPTIONS) $(WEB) $(APP) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, web-app-esm-bundled , init $(DEFAULT_OPTIONS) $(WEB) $(APP) $(ESM) $(BUNDLER_APP)      $(AND_MAKE) )
$(call ADD_TEST, web-lib-cjs         , init $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, web-lib-cjs-bundled , init $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(CJS) $(BUNDLER_LIB)      $(AND_MAKE) )
$(call ADD_TEST, web-lib-esm         , init $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE) )
$(call ADD_TEST, web-lib-esm-bundled , init $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(ESM) $(BUNDLER_LIB)      $(AND_MAKE) )
$(call ADD_TEST, interactive         , init                                                                         )

.PHONY: test test.all

test :;
	$(info $()  test.all)
	$(info $()  test.interactive)
	$(info $()  test.[cli|web]-[app|lib]-[cjs|esm])
	$(info $()  test.[cli|web]-[app|lib]-[cjs|esm]-bundled)

test.all : $(filter-out test.interactive,$(TEST_TARGETS))
	echo ✅ All tests have passed

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
