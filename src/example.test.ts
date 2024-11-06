import assert = require("node:assert");
import { describe, it } from "node:test";

const SKIP = false;
const FAIL = false;
const TODO = false;

const CONSOLE_LOG = false;

describe("myFunction1", () => {
    describe("when condition1", () => {
        it("it performs action1", { skip: false, todo: TODO }, async () => {
            if (CONSOLE_LOG) {
                console.log("first test\n      second line");
            }
            assert.equal(1, 1);
        });

        it("it performs action2", { skip: SKIP, todo: false }, async () => {
            assert.equal(1, 1);
        });
    });

    describe("when condition2", () => {
        it("it performs action1", { skip: false, todo: false }, async () => {
            assert.equal(FAIL ? 0 : 1, 1);
        });

        it("it performs action2", { skip: false, todo: false }, async () => {
            assert.equal(1, 1);
        });
    });
});

describe("outer block 2", () => {
    describe("when condition1", () => {
        it("it performs action1", { skip: false, todo: false }, async () => {
            if (CONSOLE_LOG) {
                console.log("second test\n    second line");
            }
            assert.equal(1, 1);
        });

        it("it performs action2", { skip: SKIP, todo: false }, async () => {
            assert.equal(1, 1);
        });
    });

    describe("when condition2", () => {
        it("it performs action1", { skip: false, todo: TODO }, async () => {
            assert.equal(1, 1);
        });

        it("it performs action2", { skip: false, todo: false }, async () => {
            assert.equal(FAIL ? 0 : 1, 1);
        });
    });
});
