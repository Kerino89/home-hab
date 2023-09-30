import { validateNamespacePath } from "../../src/helpers/path";

describe("Helper (path):", () => {
  it("remains at the root level", () => {
    expect(validateNamespacePath("G://home/", "G://home/test/")).toBeTruthy();
    expect(validateNamespacePath("G://home/", "G://test/")).toBeFalsy();
    expect(validateNamespacePath("G:", "G://test/")).toBeTruthy();
    expect(validateNamespacePath("G:/", "G://test/")).toBeTruthy();
    expect(validateNamespacePath("/", "/")).toBeTruthy();
    expect(validateNamespacePath("/home", "/home/test")).toBeTruthy();
    expect(validateNamespacePath("G:", "/")).toBeFalsy();
  });
});
