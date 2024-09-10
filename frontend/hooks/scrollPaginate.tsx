import { useEffect } from "react";

//HOOK TO FACILITATE INFINITE SCROLL PAGINATION
const useFetchOnPageEnd = (
  isFetchingNext: boolean,
  hasNext: boolean,
  fetchNext: () => void
) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollAtButtom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight;

      if (hasNext && !isFetchingNext && scrollAtButtom) {
        fetchNext();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNext, hasNext]);
};

export default useFetchOnPageEnd;
