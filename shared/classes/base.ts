export class BaseClass {
  constructor() {}

  public static getSplittedTags(tags: string): string[] {
  return tags?.split(' ');
  } 

  public static getJoinedTags(tags: string[]): string {
  return tags?.join(' ');
  }
}