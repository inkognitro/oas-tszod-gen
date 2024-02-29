export type FileGenerationConfig = {
  createFile: (filePath: string, content: string) => void;
};
export class CodeGenerator {
  private readonly specification: object;
  constructor(specification: object) {
    this.specification = specification;
  }

  public generateFiles(config: FileGenerationConfig) {
    console.log(this.specification);
  }
}
