export const resultWorthActingOn = result => {
  /**
   * Takes a DnD drag event and works out if it's worth responding to by
   * checking if the dragged thing actually moved, and if it did whether it
   * moved to a new location.
   */

  const { destination, source } = result;
  if (!destination) return false;
  if ((
    destination.droppableId === source.droppableId
  ) && (
    destination.index === source.index
  )) {
    return false;
  }
  return true;
}