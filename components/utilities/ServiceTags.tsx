import { TagToHexColorInterface } from "@/shared/interfaces/tag-to-hex-color";

interface ServiceTagsProps {
  tags: string[];
}

const tagToHexColorDict: TagToHexColorInterface = {
  "OB-GYN": {
    bgColor: "bg-orange-100",
    textColor: "text-orange-600"
  },
  "Pediatric": {
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-600"
  }
}

export default function ServiceTags({tags}: ServiceTagsProps) {
  return (
    <>
      {tags.map(tag => (
        <span 
          key={tag}
          className={`${tagToHexColorDict[tag as keyof TagToHexColorInterface].bgColor} 
          ${tagToHexColorDict[tag as keyof TagToHexColorInterface].textColor}
          rounded-full px-1.5 py-1 text-xs font-medium`}>
          {tag}
        </span>
      ))}
    </>
  );
}