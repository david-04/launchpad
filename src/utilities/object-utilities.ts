//----------------------------------------------------------------------------------------------------------------------
// Quick and dirty check if two objects are equal
//----------------------------------------------------------------------------------------------------------------------

export function isEqual(item1: unknown, item2: unknown) {
    return JSON.stringify(item1) === JSON.stringify(item2);
}

//----------------------------------------------------------------------------------------------------------------------
// Deep-clone an object
//----------------------------------------------------------------------------------------------------------------------

export function deepClone<T>(value: T): T {
    return recursiveClone(value, []) as T;
}

function recursiveClone(value: unknown, stack: Array<{ value: unknown; clone: unknown }>) {
    let clone: unknown = value;

    if (value && "object" === typeof value) {
        const parent = stack.filter(item => item.value === value)[0];
        if (parent) {
            return parent.clone;
        }
        if (Array.isArray(value)) {
            const cloneArray = new Array<unknown>();
            stack.push({ value: value, clone });
            value.forEach(item => cloneArray.push(recursiveClone(item, stack)));
            clone = cloneArray;
        } else {
            const cloneObject = Object.create(Object.getPrototypeOf(value));
            if (value instanceof Error) {
                cloneObject.stack = `${value.stack}`;
                cloneObject.message = value.message;
                cloneObject.name = value.name;
            }
            stack.push({ value: value, clone });
            for (const key of Object.keys(value) as Array<keyof typeof value>) {
                if ("constructor" !== key) {
                    cloneObject[key] = recursiveClone(value[key], stack);
                }
            }
            clone = cloneObject;
        }
        stack.pop();
    }

    return clone;
}

//----------------------------------------------------------------------------------------------------------------------
// Deep-merge an object
//----------------------------------------------------------------------------------------------------------------------

export function deepMerge<B, O>(base: B, overlay: Exclude<O, null | undefined>): B & O;
export function deepMerge<B, O>(base: B, overlay: O): (B & O) | Extract<O, null | undefined>;
export function deepMerge<B, O>(base: B, overlay: O): B & O {
    return recursiveMerge(deepClone(base), overlay, []) as B & O;
}

//----------------------------------------------------------------------------------------------------------------------
// Recursively merge the overlay object into the base object.
//----------------------------------------------------------------------------------------------------------------------

function recursiveMerge(base: unknown, overlay: unknown, stack: Array<{ base: unknown; overlay: unknown }>) {
    if (base && "object" === typeof base && overlay && "object" === typeof overlay && !Array.isArray(base)) {
        if (!stack.filter(item => item.base === base && item.overlay === overlay).length) {
            for (const key of Object.keys(overlay) as Array<keyof typeof overlay>) {
                stack.push({ base, overlay });
                if (base && "object" === typeof base) {
                    base = { ...base, [key]: recursiveMerge(base[key], overlay[key], stack) };
                }
                stack.pop();
            }
        }
        return base;
    }
    return deepClone(overlay);
}
