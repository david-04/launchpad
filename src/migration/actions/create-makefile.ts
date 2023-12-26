import { NewConfig } from "config/config-objects";
import type { MigrationContext } from "../data/migration-context";

const SEPARATOR_LINE = `#${new Array(119).fill("-").join("")}`;

//----------------------------------------------------------------------------------------------------------------------
// Create a makefile
//----------------------------------------------------------------------------------------------------------------------

export function createMakefile(context: MigrationContext) {
    const makefile = context.files.get("Makefile");
    if (context.newConfig.createMakefile && !makefile.exists) {
        makefile.lines = [
            "include .launchpad/Makefile.header # see .launchpad/Makefile.documentation",
            ...getDefaultTargetSection(context.newConfig),
            ...getBundleSection(context.newConfig),
            ...getCleanSection(context.newConfig),
            "",
            "",
            "",
            "",
            "",
            SEPARATOR_LINE,
            "include .launchpad/Makefile.footer",
        ];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Default target
//----------------------------------------------------------------------------------------------------------------------

function getDefaultTargetSection({ bundler, runtime, tscOutDir, bundlerOutDir, projectName }: NewConfig) {
    const header = getSpacedSeparator("Default target");
    const prerequisites = bundler.value === "disabled" ? "LP_PREREQUISITE_TSC" : "LP_PREREQUISITE_BUNDLE";
    if ("web" === runtime.value) {
        return [...header, `autorun : $(${prerequisites});`];
    } else {
        runtime.value satisfies "node";
        const directory = "disabled" === bundler.value ? tscOutDir : bundlerOutDir;
        const script = `${directory}/${projectName}.js`;
        return [...header, `autorun : $(${prerequisites})`, `\t$(call lp.run, ${script})`];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Bundle
//----------------------------------------------------------------------------------------------------------------------

function getBundleSection({ srcDir, projectName, bundlerOutDir, bundler }: NewConfig) {
    if ("disabled" === bundler.value) {
        return [];
    } else {
        return [
            ...getSpacedSeparator("Bundling"),
            "$(call lp.bundle.enable-minification)",
            "# $(call lp.bundle.enable-dts-only-for-targets, release)",
            "",
            `$(call lp.bundle.add-bundle, ${srcDir}/${projectName}.ts, ${bundlerOutDir}/${projectName}.js)`,
        ];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Clean
//----------------------------------------------------------------------------------------------------------------------

function getCleanSection({ bundler, bundlerOutDir, tscOutDir, webAppDir }: NewConfig) {
    const shouldCleanTscOutput =
        "disabled" !== bundler.value &&
        !bundlerOutDir.startsWith(tscOutDir) &&
        (!webAppDir || !webAppDir.startsWith(tscOutDir));

    return [
        ...getSpacedSeparator("Clean"),
        `${shouldCleanTscOutput ? "" : "# "}$(call lp.clean.tsc-output)`,
        ...("disabled" === bundler.value ? [] : [`# $(call lp.clean.bundles)`]),
        "# $(call lp.clean.npm-packages)",
        "# $(call lp.clean.files, list files here...)",
    ];
}

//----------------------------------------------------------------------------------------------------------------------
// Create a section
//----------------------------------------------------------------------------------------------------------------------

function getSpacedSeparator(title: string) {
    return ["", SEPARATOR_LINE, `# ${title}`, SEPARATOR_LINE, ""];
}
