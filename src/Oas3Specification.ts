export class Oas3Specification {
  private readonly specification: object;
  constructor(specification: object) {
    this.specification = specification;
  }

  public print() {
    console.log(this.specification);
  }
}
