import { NewConfig } from "../../config/config-objects";
import type { MigrationContext } from "../data/migration-context";

const SEPARATOR_LENGTH = 120;
const SEPARATOR_LINE = `#${new Array(SEPARATOR_LENGTH - 1).fill("-").join("")}`;

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
    const comment =
        bundler.value === "disabled" ? "" : " # or $(LP_PREREQUISITE_BUNDLE_JS) + $(LP_PREREQUISITE_BUNDLE_DTS)";
    if ("web" === runtime.value) {
        return [...header, `autorun : $(${prerequisites});${comment}`];
    } else {
        runtime.value satisfies "node";
        const directory = "disabled" === bundler.value ? tscOutDir : bundlerOutDir;
        const script = `${directory}/${projectName}.js`;
        return [...header, `autorun : $(${prerequisites})${comment}`, `\t$(call lp.run, ${script})`];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Bundle
//----------------------------------------------------------------------------------------------------------------------

function getBundleSection({ srcDir, projectName, bundlerOutDir, bundler, artifact, dtsBundler, runtime }: NewConfig) {
    if ("disabled" === bundler.value) {
        return [];
    } else {
        const options = [
            "sourcemap",
            "lib" === artifact && "disabled" !== dtsBundler.value ? ["dts"] : [],
            "app" === artifact && "web" !== runtime.value ? ["shebang"] : [],
        ]
            .flatMap(option => option)
            .map(option => option.trim())
            .filter(option => option)
            .join(" ");
        return [
            ...getSpacedSeparator("Bundling"),
            `$(call lp.bundle.add, ${srcDir}/${projectName}.ts, ${bundlerOutDir}/${projectName}.js, ${options})`,
        ];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Clean
//----------------------------------------------------------------------------------------------------------------------

function getCleanSection({ bundler, bundlerOutDir, tscOutDir, webAppDir }: NewConfig) {
    const shouldCleanTscOutput =
        "disabled" !== bundler.value && !bundlerOutDir.startsWith(tscOutDir) && !webAppDir?.startsWith(tscOutDir);

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
