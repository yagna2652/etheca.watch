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
  gap: number = 20
) => {
  const [columnCount, setColumnCount] = useState<number>(0);
  const calculateLayout = useCallback(() => {
    if (!gridRef.current) return;

    const container = gridRef.current;
    const containerWidth = container.offsetWidth;
    const numColumns = Math.floor(containerWidth / (cardWidth + gap));
    
    if (numColumns <= 0) return;

    setColumnCount(numColumns);

    const columnHeights = Array(numColumns).fill(0);
    const cards = container.querySelectorAll('article');

    cards.forEach((card: Element) => {
      const htmlCard = card as HTMLElement;
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      htmlCard.style.left = `${shortestColumnIndex * (cardWidth + gap)}px`;
      htmlCard.style.top = `${columnHeights[shortestColumnIndex]}px`;
      
      columnHeights[shortestColumnIndex] += htmlCard.offsetHeight + gap;
    });

    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight}px`;
  }, [gridRef, cardWidth, gap]);


  const debouncedCalculateLayout = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateLayout, 150);
    };
  }, [calculateLayout]);

  useLayoutEffect(() => {
    const debouncedResize = debouncedCalculateLayout();
    
    calculateLayout();
    
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [filteredPosts, calculateLayout, debouncedCalculateLayout]);

  return columnCount;
};

export default useMasonryLayout;