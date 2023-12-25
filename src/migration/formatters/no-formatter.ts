import { Formatter } from "./formatter";

//----------------------------------------------------------------------------------------------------------------------
// Placeholder class for the "disabled" formatter
//----------------------------------------------------------------------------------------------------------------------

export class NoFormatter extends Formatter {
    public constructor() {
        super(
            [],
            "",
            () => {},
            () => {}
        );
    }
}
