import { ComponentProps } from "./types";

export function extractKeywords(pageContent: ComponentProps['content']): string[] {
    const keywords = new Set<string>();
    
    pageContent?.forEach((block: ComponentProps['content'][number]) => {
      if (block.children) {
        block.children.forEach((child: any) => {
          if (child.text) {
            keywords.add(child.text);
          }
        });
      }
    });
  
    return Array.from(keywords);
  }
  