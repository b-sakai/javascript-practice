// ts-node -O '{ "target": "es2020", "strict": true }' conditional-types.ts


// A conditional type
type ExtractArray<T> = T extends any[] ? T : never

// Can filter types from unions
type Data =  string | string[] | number | number[]
type ArrayData = ExtractArray<Data> // The type string[] | number[]

/* Compile-time error
type ArrayOf<T> = T extends U[] ? U : never // Error—U not defined
*/

// Remedy: Infer keyword
type ArrayOf<T> = T extends (infer U)[] ? U : never
