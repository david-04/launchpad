import type { NewConfig } from "../config/config-objects.js";
import { MigrationContext } from "./data/migration-context.js";

//----------------------------------------------------------------------------------------------------------------------
// The migration's main process
//----------------------------------------------------------------------------------------------------------------------

export function migrate(
    context: Omit<ConstructorParameters<typeof MigrationContext>[0], "newConfig" | "tabSize"> & {
        newConfig: NewConfig | undefined;
    }
) {
    console.log(context);
}
