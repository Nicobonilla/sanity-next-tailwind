import type { ComponentProps } from "./types";
export function extractKeywords(pageContent: ComponentProps['content'] | null | undefined): string[] {
  const keywords = new Set<string>();

  if (!Array.isArray(pageContent)) {
      return [];
  }

  pageContent
      .filter(block => !block.listItem || block.listItem === "bullet") // 🔹 Filtra `listItem: "number"`
      .forEach(block => {
          if (Array.isArray(block.children)) {
              block.children.forEach(child => {
                  if (typeof child.text === "string") {
                      keywords.add(child.text);
                  }
              });
          }
      });

  return Array.from(keywords);
}
