
type UseHoverHandlersProps = {
  emblaApi: any | undefined;
  setHoveredItemIndex: (index: number | null) => void;
  setActiveIndex: (index: number) => void;
  hoveredItemIndex: number | null;
  activeIndex: number;
};

export function useHoverHandlers({
  emblaApi,
  setHoveredItemIndex,
  setActiveIndex,
  hoveredItemIndex,
  activeIndex,
}: UseHoverHandlersProps) {
  
  const handleMouseEnter = (index: number) => {
    setHoveredItemIndex(index);
    emblaApi?.scrollTo(index);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  const getIsActive = (index: number) => {
    if (hoveredItemIndex !== null) {
      return hoveredItemIndex === index;
    }
    return activeIndex === index;
  };

  return { handleMouseEnter, handleMouseLeave, getIsActive };
}
