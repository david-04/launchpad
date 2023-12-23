import { NewConfig } from "config/config-objects";
import type { MigrationContext } from "../data/migration-context";

const SEPARATOR = "#" + new Array(119).fill("-").join("");

//----------------------------------------------------------------------------------------------------------------------
// Create a makefile
//----------------------------------------------------------------------------------------------------------------------

export function createMakefile(context: MigrationContext) {
    const makefile = context.files.get("Makefile");
    if (!makefile.exists) {
        makefile.lines = [...getHeader(), ...getAutorunTarget(context), ...getBundleSection(context), ...getFooter()];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Header
//----------------------------------------------------------------------------------------------------------------------

function getHeader() {
    return ["include .launchpad/Makefile.header", ...getSeparator("See .launchpad/Makefile.documentation for details")];
}

//----------------------------------------------------------------------------------------------------------------------
// Autorun target
//----------------------------------------------------------------------------------------------------------------------

function getAutorunTarget(context: MigrationContext) {
    const prerequisites = context.newConfig.bundler.value === "disabled" ? "LP_TSC_TARGETS" : "LP_BUNDLE_TARGETS";
    if (context.newConfig.runtime.value === "web") {
        return [`autorun : $(${prerequisites});`];
    } else {
        return [`autorun : $(${prerequisites})`, `\t$(LP_RUN) ${getScriptToRun(context.newConfig)}`];
    }
}

function getScriptToRun(config: NewConfig) {
    if (config.bundler.value === "disabled") {
        return `${config.tscOutDir}/${config.projectName}.js`;
    } else {
        return `${config.bundlerOutDir}/${config.projectName}.js`;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Bundle
//----------------------------------------------------------------------------------------------------------------------

function getBundleSection(context: MigrationContext) {
    if ("disabled" === context.newConfig.bundler.value) {
        return [];
    } else {
        const { srcDir, projectName, bundlerOutDir } = context.newConfig;
        return [
            ...getSeparator("Bundle"),
            `$(call lp.bundle.add-bundle, ${srcDir}/${projectName}.ts, ${bundlerOutDir}/${projectName}.js)`,
        ];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Footer
//----------------------------------------------------------------------------------------------------------------------

function getFooter() {
    return [...getSeparator("Built-in default targets"), "include  .launchpad/Makefile.footer"];
}

//----------------------------------------------------------------------------------------------------------------------
// Generate a separator
//----------------------------------------------------------------------------------------------------------------------

function getSeparator(title: string) {
    return ["", SEPARATOR, `# ${title}`, SEPARATOR, ""];
}
