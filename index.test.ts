import get from "./index";

describe("get", () => {
  it("should return undefined if we try to access on undefined", () => {
    const result = get(undefined as { property: string } | undefined, [
      "property",
    ]);
    expect(result).toBe(undefined);
  });

  it("should get property from an object", () => {
    const result = get({ property: "test" }, ["property"]);
    expect(result).toBe("test");
  });

  it("should return undefined when accessing a nonexistent property", () => {
    const result = get({} as { optional?: string }, ["optional"]);
    expect(result).toBe(undefined);
  });

  it("should get property from an array", () => {
    const result = get(["hello"], [0]);
    expect(result).toBe("hello");
  });

  it("should return undefined when accessing a nonexistent index", () => {
    const result = get(["hello"], [2]);
    expect(result).toBe(undefined);
  });

  it("should get a nested property from an object", () => {
    const result = get({ nested: { property: "test" } }, [
      "nested",
      "property",
    ]);
    expect(result).toBe("test");
  });

  it("should return undefined when we access a property nested behind a missing optional property", () => {
    const result = get({} as { optional?: { property: string } }, [
      "optional",
      "property",
    ]);
    expect(result).toBe(undefined);
  });

  it("should get a nested property from an array", () => {
    const result = get([{ property: "test" }], [0, "property"]);
    expect(result).toBe("test");
  });

  it("should return undefined when we access a property nested behind missing index", () => {
    const result = get([{ property: "test" }], [2, "property"]);
    expect(result).toBe(undefined);
  });
});
