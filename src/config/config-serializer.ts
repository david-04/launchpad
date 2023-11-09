import type { SerializationDetails } from "./config-data-types.js";
import type { NewConfig } from "./config-objects.js";
import { ConfigProperties } from "./config-properties.js";

//----------------------------------------------------------------------------------------------------------------------
// Serialize properties
//----------------------------------------------------------------------------------------------------------------------

export function serializeConfig(config: NewConfig) {
    const header = [
        "#-----------------------------------------------------------------------------------------------------------------------",
        "# This file is auto-generated. Do not edit (unless fixing errors). To reconfigure the project, run: launchpad init",
        "#-----------------------------------------------------------------------------------------------------------------------",
    ];
    const properties = ConfigProperties.arrays.current.map(property => property.serialize(config));
    const maxKeyLength = properties.reduce((max, property) => Math.max(max, property?.key.length ?? 0), 0);
    const maxValueLength = properties.reduce((max, property) => Math.max(max, property?.value.length ?? 0), 0);
    const lines = properties.map(property => (property ? formatProperty(property, maxKeyLength, maxValueLength) : ""));
    return [...header, "", ...lines.filter(line => line), ""].join("\n");
}

//----------------------------------------------------------------------------------------------------------------------
// Serialize a single property
//----------------------------------------------------------------------------------------------------------------------

function formatProperty(property: SerializationDetails, maxKeyLength: number, maxValueLength: number) {
    const key = property.key.padEnd(maxKeyLength);
    const value = property.value.padEnd(maxValueLength);
    const comment = property.comment ? ` # {property.comment}` : "";
    return `${key} = ${value} ${comment}`;
}
