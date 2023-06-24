import { ServiceInterface } from "@/interfaces/service";

export class ServiceClass implements ServiceInterface {
  tags: string[] = [];
  joinedTags: string = '';
  name: string;
  description?: string | undefined;

  constructor(name: string, tags: string[], joinedTags: string, description?: string) {
    this.name = name;
    this.tags = tags;
    this.joinedTags = joinedTags;
    this.description = description;
  }

  public static fromInterface(service: ServiceInterface): ServiceClass {
    return new ServiceClass(
      service.name,
      service.tags,
      this.getJoinedTags(service.tags),
      service.description
    );
  }

  public static getJoinedTags(tags: string[]): string {
    return tags.join(' ');
  }
}