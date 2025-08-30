import { useEffect, useLayoutEffect, RefObject, useCallback, useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
}

const useMasonryLayout = (
  gridRef: RefObject<HTMLDivElement>,
  filteredPosts: BlogPost[],
  cardWidth: number = 350,
  gap: number = 20,
  staticColumnCount?: number
) => {
  const [columnCount, setColumnCount] = useState<number>(0);
  const calculateLayout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const effectiveCardWidth = cardWidth + gap; // The card's width plus its right-side gap
    
    // Use static column count if provided, otherwise calculate dynamically
    const columnCount = staticColumnCount || Math.floor((grid.offsetWidth + gap) / effectiveCardWidth);
    const columnHeights = Array(columnCount).fill(0);
    const children = Array.from(grid.children) as HTMLElement[];
    
    if (columnCount <= 0) return;

    setColumnCount(columnCount);

    children.forEach((child, index) => {
      // Make sure we only position blog cards, not vertical lines
      if (child.tagName === 'ARTICLE') {
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const top = columnHeights[shortestColumnIndex];
        
        // Update the left calculation with proper gap
        const left = shortestColumnIndex * effectiveCardWidth;

        child.style.left = `${left}px`;
        child.style.top = `${top}px`;

        // Update the column height calculation with gap
        columnHeights[shortestColumnIndex] += child.offsetHeight + gap;
      }
    });

    const maxHeight = Math.max(...columnHeights);
    grid.style.height = `${maxHeight}px`;
  }, [gridRef, cardWidth, gap, staticColumnCount]);


  const debouncedCalculateLayout = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateLayout, 150);
    };
  }, [calculateLayout]);

  useLayoutEffect(() => {
    const debouncedResize = debouncedCalculateLayout();
    
    // Add delay to ensure cards are fully rendered with images
    const timeoutId = setTimeout(() => {
      calculateLayout();
      // Run again after a longer delay to account for image loading
      setTimeout(calculateLayout, 500);
    }, 50);
    
    window.addEventListener('resize', debouncedResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [filteredPosts, calculateLayout, debouncedCalculateLayout]);

  return columnCount;
};

export default useMasonryLayout;