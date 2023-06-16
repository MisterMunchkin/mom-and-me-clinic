import { ReactNode } from "react"

interface TextHighlightProps {
  children: ReactNode,
  bgColor: string
}

export default function TextHighlight({children, bgColor} : TextHighlightProps) {
  return (
    <span className={`${bgColor} rounded-md px-2 py-0.5`}>
      {children}
    </span>
  )
}