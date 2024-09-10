import { useEffect, useRef } from "react";

// CLICK OUTSIDE MODAL SHOULD TRIGGER CALLBACK
export default function useHideOnClickedOutside<T>(
  handlerLogic: T,
  extraTargetIds?: string[],
) {
  const modalRef = useRef<HTMLInputElement>(null);

  const handler = (event: MouseEvent) => {
    const others = extractElementsByID(extraTargetIds ?? []);
    const element = event.target as HTMLElement;
    if (modalRef.current !== null)
      if (matchTarget([modalRef.current, ...others], element)) {
        if (typeof handlerLogic === "function") handlerLogic();
      }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return modalRef;
}

function extractElementsByID(idArray: string[]): HTMLElement[] {
  return idArray
    .filter((id) => document.getElementById(id))
    .map((id) => document.getElementById(id)) as HTMLElement[];
}

function matchTarget(targets: HTMLElement[], element: HTMLElement): boolean {
  return targets.every((val) => !val.contains(element));
}
