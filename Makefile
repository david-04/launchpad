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

$(call lp.bundle.disable-minification)

$(call lp.bundle.add-bundle, src/launchpad-cli.ts, dist/launchpad.js)

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

DELETE_TEST_DIRECTORY=$(if $(wildcard ../launchpad-test/$(strip $(1))), rm -rf ../launchpad-test/$(strip $(1)), echo -n "")

TEST_INIT_INTERACTIVE=\
	$(call DELETE_TEST_DIRECTORY, $(1)) \
	&& mkdir -p "../launchpad-test/$(strip $(1))" \
	&& cd "../launchpad-test/$(strip $(1))" \
	&& node ../../launchpad/dist/launchpad.js init

TEST_INIT=$(TEST_INIT_INTERACTIVE) --auto-selected-dependencies= \
                                   --bundler-out-dir=default \
                                   --create-debug-module=true \
                                   --create-project-template=true \
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

ADD_TEST=$(eval $(call ADD_TEST_2,$(strip $(1)),$(strip $(2))))

define ADD_TEST_2
.PHONY: test.$(1)
$(eval TEST_TARGETS+= test.$(1))
test.$(1) : $(LP_PREREQUISITE_BUNDLE)
	$$(call TEST_INIT, $(1)) $(2) # && make

endef

CLI=--runtime=cli
WEB=--runtime=web
APP=--artifact=app
LIB=--artifact=lib
ESM=--module-system=esm
CJS=--module-system=cjs
BUNDLER_DISABLED=--bundler=disabled --dts-bundler=disabled
BUNDLER_APP=--bundler=default --dts-bundler=disabled
BUNDLER_LIB=--bundler=default --dts-bundler=default

$(call ADD_TEST, cli-app-cjs         , $(CLI) $(APP) $(CJS) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, cli-app-cjs-bundled , $(CLI) $(APP) $(CJS) $(BUNDLER_APP)		)
$(call ADD_TEST, cli-app-esm         , $(CLI) $(APP) $(ESM) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, cli-app-esm-bundled , $(CLI) $(APP) $(ESM) $(BUNDLER_APP)		)

$(call ADD_TEST, cli-lib-cjs         , $(CLI) $(LIB) $(CJS) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, cli-lib-cjs-bundled , $(CLI) $(LIB) $(CJS) $(BUNDLER_LIB)		)
$(call ADD_TEST, cli-lib-esm         , $(CLI) $(LIB) $(ESM) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, cli-lib-esm-bundled , $(CLI) $(LIB) $(ESM) $(BUNDLER_LIB)		)

$(call ADD_TEST, web-app-cjs         , $(WEB) $(APP) $(CJS) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, web-app-cjs-bundled , $(WEB) $(APP) $(CJS) $(BUNDLER_APP)		)
$(call ADD_TEST, web-app-esm         , $(WEB) $(APP) $(ESM) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, web-app-esm-bundled , $(WEB) $(APP) $(ESM) $(BUNDLER_APP)		)

$(call ADD_TEST, web-lib-cjs         , $(WEB) $(LIB) $(CJS) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, web-lib-cjs-bundled , $(WEB) $(LIB) $(CJS) $(BUNDLER_LIB)		)
$(call ADD_TEST, web-lib-esm         , $(WEB) $(LIB) $(ESM) $(BUNDLER_DISABLED)	)
$(call ADD_TEST, web-lib-esm-bundled , $(WEB) $(LIB) $(ESM) $(BUNDLER_LIB)		)

.PHONY: test test.all test.interactive

test :;
	$(foreach TARGET, test.all test.interactive $(TEST_TARGETS), $(info $()  $(TARGET)))

test.all : $(LP_PREREQUISITE_BUNDLE);
	make --silent --no-print-directory $(TEST_TARGETS)

test.interactive : $(LP_PREREQUISITE_BUNDLE)
	$(call TEST_INIT_INTERACTIVE, interactive)

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
