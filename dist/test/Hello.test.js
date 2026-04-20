import test from "node:test";
import assert from "node:assert/strict";
import { message } from "../src/Hello.js";
test("Message returns input message", () => {
    assert.equal(message("Hello world"), "Hello world");
});
//# sourceMappingURL=Hello.test.js.map