//----------------------------------------------------------------------------------------------------------------------
// Quick and dirty check if two objects are equal
//----------------------------------------------------------------------------------------------------------------------

export function isEqual(item1: unknown, item2: unknown) {
    return JSON.stringify(item1) === JSON.stringify(item2);
}
