import { MigrationContext } from "../data/migration-context";
import { VsCodeLanguageId } from "../files/vscode-settings";

//----------------------------------------------------------------------------------------------------------------------
// Base class for all formatters
//----------------------------------------------------------------------------------------------------------------------

export class Formatter {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    protected constructor(
        public readonly supportedLanguageIds: ReadonlyArray<VsCodeLanguageId>,
        public readonly vsCodeFormatterId: string,
        public readonly createOrUpdateConfigurationExcludingVsCode: (context: MigrationContext) => void,
        public readonly removeConfigurationExcludingVsCode: (context: MigrationContext) => void
    ) {}
}
