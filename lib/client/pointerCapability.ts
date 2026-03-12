export function subscribeToInteractivePointerCapability(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const pointerQuery = window.matchMedia("(pointer: fine)");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");

  pointerQuery.addEventListener("change", onStoreChange);
  motionQuery.addEventListener("change", onStoreChange);

  return () => {
    pointerQuery.removeEventListener("change", onStoreChange);
    motionQuery.removeEventListener("change", onStoreChange);
  };
}

export function getInteractivePointerCapabilitySnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}
