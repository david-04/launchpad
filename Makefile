include .launchpad/Makefile.header

#-----------------------------------------------------------------------------------------------------------------------
# Default target
#-----------------------------------------------------------------------------------------------------------------------

autorun : compile

#-----------------------------------------------------------------------------------------------------------------------
# Help
#-----------------------------------------------------------------------------------------------------------------------

help : lp.help
	$(info ${}  my_target ....... description)

#-----------------------------------------------------------------------------------------------------------------------
# Compile
#-----------------------------------------------------------------------------------------------------------------------

$(call lp.tsc.enabled,             true)  # enable the built-in "tsc" and "compile" targets
$(call lp.tsc.extra-prerequisites,     )  # auto-generated source files that might need to be created before building
$(call lp.tsc.before-hook,             )  # shell commands to run before compiling
$(call lp.tsc.after-hook,              )  # shell commands to run after compiling

TSCONFIG_SRC_COMPONENTS=$(wildcard resources/tsconfig/02-components/tsconfig*.json)
TSCONFIG_SRC_COMPILATIONS=$(wildcard resources/tsconfig/03-compilations/tsconfig*.json)
TSCONFIG_SRC_SCRIPTS=$(wildcard scripts/build-tsconfig*)
TSCONFIG_SRC=$(TSCONFIG_SRC_COMPONENTS) $(TSCONFIG_SRC_COMPILATIONS) $(TSCONFIG_SRC_SCRIPTS)
TSCONFIG_TARGETS=$(patsubst resources/tsconfig/03-compilations/%, .launchpad/%, $(TSCONFIG_SRC_COMPILATIONS))

$(TSCONFIG_TARGETS) : $(TSCONFIG_SRC)
	scripts/build-tsconfig.sh

$(call lp.tsc.extra-prerequisites, $(TSCONFIG_TARGETS))

#-----------------------------------------------------------------------------------------------------------------------
# Bundle
#-----------------------------------------------------------------------------------------------------------------------

# not implemented yet

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
