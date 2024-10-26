include .launchpad/Makefile.header # .launchpad/Makefile.documentation

autorun : tsc;

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.help.add-phony-target, embed, .............. embed resources)
$(call lp.help.add-phony-target, publish, ............ publish the npm package)
$(call lp.help.add-phony-target, release, ............ assemble the release)
$(call lp.help.add-phony-target, test, ............... display test targets)
$(call lp.help.add-phony-target, tsconfig, ........... assemble the tsconfig.json templates)
$(call lp.help.add-phony-target, unrelease, .......... git-revert the dist directory)
$(call lp.help.add-phony-target, version, ............ update version number and copyright years)

#-----------------------------------------------------------------------------------------------------------------------
# Embed tsconfig.json templates
#-----------------------------------------------------------------------------------------------------------------------

TSCONFIG_SRC_DIRECTORIES = resources/tsconfig/02-facets resources/tsconfig/03-compilations
TSCONFIG_SRC_JSON        = $(wildcard $(foreach dir, $(TSCONFIG_SRC_DIRECTORIES), $(dir)/tsconfig*.json))
TSCONFIG_SRC             = $(TSCONFIG_SRC_JSON)
EMBEDDED_TSCONFIG        = src/resources/embedded-tsconfig.generated.ts

tsconfig : $(EMBEDDED_TSCONFIG);

$(EMBEDDED_TSCONFIG) &: $(TSCONFIG_SRC) ./bin/embed-tsconfig.sh  ./bin/embed-tsconfig.mjs
	./bin/embed-tsconfig.sh

#-----------------------------------------------------------------------------------------------------------------------
# Embed assets
#-----------------------------------------------------------------------------------------------------------------------

EMBEDDED_ASSETS_SOURCE = $(filter-out .launchpad/launchpad.cfg .launchpad/tsconfig.default.json, $(call lp.fn.wildcard, .launchpad resources/templates, *) biome.json)
EMBEDDED_ASSETS_TARGET = src/resources/embedded-assets.generated.ts

embed : $(EMBEDDED_ASSETS_TARGET)

$(EMBEDDED_ASSETS_TARGET) &: $(EMBEDDED_ASSETS_SOURCE) bin/embed-assets.sh  bin/embed-assets.mjs $(EMBEDDED_TSCONFIG)
	./bin/embed-assets.sh $@ $(sort $(patsubst bin/%, ,$(EMBEDDED_ASSETS_SOURCE)))

#-----------------------------------------------------------------------------------------------------------------------
# Update version information
#-----------------------------------------------------------------------------------------------------------------------

UPDATE_VERSION_INFO_SRC=CHANGELOG.md bin/update-version-information.sh bin/get-copyright-years.sh bin/get-version-number.sh
UPDATE_VERSION_INFO_TARGETS=LICENSE package.json dist/package.json src/resources/version-information.ts

version : $(UPDATE_VERSION_INFO_TARGETS);

$(UPDATE_VERSION_INFO_TARGETS) &: $(UPDATE_VERSION_INFO_SRC)
	./bin/update-version-information.sh

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.tsc.add-extra-prerequisites, $(EMBEDDED_TSCONFIG))
$(call lp.tsc.add-extra-prerequisites, $(EMBEDDED_ASSETS_TARGET))
$(call lp.tsc.add-extra-prerequisites, $(UPDATE_VERSION_INFO_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Test
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.test.disable                       )
# $(call lp.test.set-root-directories, build   )
# $(call lp.test.set-subdirectory    ,         )
# $(call lp.test.set-file-extension  , .test.ts)

$(call lp.help.add-phony-target, test.all, ........... generate and compile all variants of projects)
$(call lp.help.add-phony-target, test.interactive, ... generate and compile a project interactively)
$(call lp.help.add-phony-target, test.unit, .......... run the unit tests)

test :
	echo "  Targets: test.init | test.interactive | test.unit"

test.unit : lp.test;

RUN_TEST=\
	   echo "" \
   && echo "------------------------------------------------------------------------------------------------------------------------" \
	&& echo Running test for $(strip $(1)) \
	&& echo "------------------------------------------------------------------------------------------------------------------------" \
	&& echo "" \
	&& rm -rf "test/$(strip $(1))" \
	&& mkdir -p "test/$(strip $(1))" \
	&& cd "test/$(strip $(1))" \
	&& node "../../dist/launchpad.cjs" init $(2)

DEFAULT_OPTIONS  = --auto-selected-dependencies= \
                   --bundler-out-dir=default \
                   --create-debug-module=true \
                   --create-project-template=true \
                   --create-makefile=true \
                   --formatter=prettier \
                   --install-dev-dependencies=false \
                   --installation-mode=global \
                   --optional-dependencies= \
                   --package-manager=npm \
                   --preselected-dependencies= \
                   --project-name=default \
                   --src-dir=default \
                   --tab-size=4 \
                   --test-runner=disabled \
                   --tsc-out-dir=default \
                   --uplift-dependencies=true \
                   --vscode-settings=default \
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

AND_MAKE=&& echo "" && $(MAKE)

test.init : $(LP_PREREQUISITE_BUNDLE)
	echo "Running tests..."
	+ $(call RUN_TEST, cli-app-cjs         , $(DEFAULT_OPTIONS) $(CLI) $(APP) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, cli-app-cjs-bundled , $(DEFAULT_OPTIONS) $(CLI) $(APP) $(CJS) $(BUNDLER_APP)      $(AND_MAKE))
	+ $(call RUN_TEST, cli-app-esm         , $(DEFAULT_OPTIONS) $(CLI) $(APP) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, cli-app-esm-bundled , $(DEFAULT_OPTIONS) $(CLI) $(APP) $(ESM) $(BUNDLER_APP)      $(AND_MAKE))
	+ $(call RUN_TEST, cli-lib-cjs         , $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, cli-lib-cjs-bundled , $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(CJS) $(BUNDLER_LIB)      $(AND_MAKE))
	+ $(call RUN_TEST, cli-lib-esm         , $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, cli-lib-esm-bundled , $(DEFAULT_OPTIONS) $(CLI) $(LIB) $(ESM) $(BUNDLER_LIB)      $(AND_MAKE))
	+ $(call RUN_TEST, web-app-cjs         , $(DEFAULT_OPTIONS) $(WEB) $(APP) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, web-app-cjs-bundled , $(DEFAULT_OPTIONS) $(WEB) $(APP) $(CJS) $(BUNDLER_APP)      $(AND_MAKE))
	+ $(call RUN_TEST, web-app-esm         , $(DEFAULT_OPTIONS) $(WEB) $(APP) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, web-app-esm-bundled , $(DEFAULT_OPTIONS) $(WEB) $(APP) $(ESM) $(BUNDLER_APP)      $(AND_MAKE))
	+ $(call RUN_TEST, web-lib-cjs         , $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(CJS) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, web-lib-cjs-bundled , $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(CJS) $(BUNDLER_LIB)      $(AND_MAKE))
	+ $(call RUN_TEST, web-lib-esm         , $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(ESM) $(BUNDLER_DISABLED) $(AND_MAKE))
	+ $(call RUN_TEST, web-lib-esm-bundled , $(DEFAULT_OPTIONS) $(WEB) $(LIB) $(ESM) $(BUNDLER_LIB)      $(AND_MAKE))

test.interactive : $(LP_PREREQUISITE_BUNDLE)
	+ $(call RUN_TEST, interactive         ,)

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.bundle.add, src/launchpad-cli.ts, dist/launchpad.cjs, shebang)

#-----------------------------------------------------------------------------------------------------------------------
# Format
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.format.exclude, resources test tmp dist src)
$(call lp.format.include, $(filter-out src/resources, $(wildcard src/*)))
$(call lp.format.include, $(filter-out src/resources/embedded-%.ts, $(wildcard src/resources/*)))

#-----------------------------------------------------------------------------------------------------------------------
# Release
#-----------------------------------------------------------------------------------------------------------------------

release : clean.build-and-dist bundle
	   echo Assembling package... \
   && cp -f README.md dist/README.md \
   && cp -f resources/package/package.json dist/package.json

clean.build-and-dist :
	echo Deleting pre-existing builds/bundles... && rm -rf build dist

unrelease :
	echo Reverting the version number... && git checkout -- src/resources/version-information.ts resources/package/package.json

#-----------------------------------------------------------------------------------------------------------------------
# Publish
#-----------------------------------------------------------------------------------------------------------------------

publish:
	cd dist && npm publish --access public

#-----------------------------------------------------------------------------------------------------------------------
# Clean
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.clean.tsc-output)
$(call lp.clean.files, dist)

#-----------------------------------------------------------------------------------------------------------------------
# Built-in default targets
#-----------------------------------------------------------------------------------------------------------------------

include .launchpad/Makefile.footer
