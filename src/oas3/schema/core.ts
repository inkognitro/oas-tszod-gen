export type SchemaCode = {
  typeScriptCode: string;
  codeComment?: string;
};

export interface SchemaCodeManager {
  generateComponentTypeName(oas3ComponentName: string): string;
  addComponentSchema(oas3ComponentName: string): void;
}
