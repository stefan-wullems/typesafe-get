import { expectError, expectType } from "tsd";

import get from "./index";

// Nonexistent property should give a type error
expectError(get({ property: "test" }, ["nonexistentProperty"]));

// Existent property should infer correct type
expectType<string>(get({ property: "test" }, ["property"]));

// Accessing a property on a potentially undefined object should propagate the undefined
expectType<string | undefined>(
  get({ property: "test" } as { property: string } | undefined, ["property"])
);

// Accessing a property on an array is inferred as a potentially undefined entry
expectType<string | undefined>(get(["hello"], [0]));

// Accessing a property on a record is inferred as a potentially undefined entry
expectType<string | undefined>(
  get({ property: "test" } as { [key: string]: string }, ["property"])
);

// Nested: Nonexistent property should give a type error
expectError(
  get({ nested: { property: "test" } }, ["nested", "nonexistentProperty"])
);

// Nested: Existent property should infer correct type
expectType<string>(
  get({ nested: { property: "test" } }, ["nested", "property"])
);

// Nested: Accessing a property on a potentially undefined object should propagate the undefined
expectType<string | undefined>(
  get({ nested: { property: "test" } } as { nested?: { property: string } }, [
    "nested",
    "property",
  ])
);

// Nested: Accessing a property on an array is inferred as a potentially undefined entry
expectType<string | undefined>(get([{ property: "test" }], [0, "property"]));

// Nested: Accessing a property on a record is inferred as a potentially undefined entry
expectType<string | undefined>(
  get(
    { property1: { property2: "test" } } as {
      [key: string]: { property2: string };
    },
    ["property1", "property2"]
  )
);

// 5 levels deep stucture
const fiveLevelsDeep = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: "test",
        },
      },
    },
  },
};

// Nested: Existent property should infer correct type
expectType<string>(
  get(fiveLevelsDeep, ["level1", "level2", "level3", "level4", "level5"])
);
