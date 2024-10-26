import { ASSETS } from "../../resources/embedded-assets.generated";
import { LAUNCHPAD_TEST, LAUNCHPAD_TEST_BAT, LAUNCHPAD_TEST_REPORTER_NODE_TAP_AWK } from "../data/known-files";
import type { MigrationContext } from "../data/migration-context";

//----------------------------------------------------------------------------------------------------------------------
// Recreate .launchpad/test-reporter-node-tap.awk
//----------------------------------------------------------------------------------------------------------------------

export function recreateLaunchpadDirectoryTestScripts(context: MigrationContext) {
    recreateOrDeleteTestRunnerScripts(context);
    recreateOrDeleteNodeTestReporter(context);
}

function recreateOrDeleteTestRunnerScripts(context: MigrationContext) {
    if (context.newConfig.testRunner.value === "disabled") {
        context.files.get(LAUNCHPAD_TEST).delete();
        context.files.get(LAUNCHPAD_TEST_BAT).delete();
    } else {
        context.files.get(LAUNCHPAD_TEST).contents = ASSETS[LAUNCHPAD_TEST];
        context.files.get(LAUNCHPAD_TEST).makeExecutable();
        context.files.get(LAUNCHPAD_TEST_BAT).contents = ASSETS[LAUNCHPAD_TEST_BAT];
    }
}

function recreateOrDeleteNodeTestReporter(context: MigrationContext) {
    if (context.newConfig.testRunner.value === "node") {
        context.files.get(LAUNCHPAD_TEST_REPORTER_NODE_TAP_AWK).contents = ASSETS[LAUNCHPAD_TEST_REPORTER_NODE_TAP_AWK];
    } else {
        context.files.get(LAUNCHPAD_TEST_REPORTER_NODE_TAP_AWK).delete();
    }
}
