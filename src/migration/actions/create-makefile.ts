import { NewConfig } from "config/config-objects";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Create a makefile
//----------------------------------------------------------------------------------------------------------------------

export function createMakefile(context: MigrationContext) {
    const makefile = context.files.get("Makefile");
    if (context.newConfig.createMakefile && !makefile.exists) {
        makefile.lines = [
            "include .launchpad/Makefile.header # see .launchpad/Makefile.documentation",
            "",
            ...getDefaultTarget(context.newConfig),
            ...getBundleConfiguration(context.newConfig),
            "include .launchpad/Makefile.footer",
        ];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Default target
//----------------------------------------------------------------------------------------------------------------------

function getDefaultTarget({ bundler, runtime, tscOutDir, bundlerOutDir, projectName }: NewConfig) {
    const prerequisites = bundler.value === "disabled" ? "LP_TSC_TARGETS" : "LP_BUNDLE_TARGETS";
    if ("web" === runtime.value) {
        return [`autorun : $(${prerequisites});`, ""];
    } else {
        const directory = "disabled" === bundler.value ? tscOutDir : bundlerOutDir;
        const script = `${directory}/${projectName}.js`;
        return [`autorun : $(${prerequisites})`, `\t$(lp.run, ${script})`, ""];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Bundle configuration
//----------------------------------------------------------------------------------------------------------------------

function getBundleConfiguration({ srcDir, projectName, bundlerOutDir, bundler }: NewConfig) {
    if ("disabled" === bundler.value) {
        return [];
    } else {
        return [`$(call lp.bundle.add-bundle, ${srcDir}/${projectName}.ts, ${bundlerOutDir}/${projectName}.js)`, ""];
    }
}
