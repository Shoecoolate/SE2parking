// Get closest available slot using Linear Search Algorithm

interface Props {
  slots: number[];
  takenSlots: number[];
}

/**
 * Finds the closest available slot from the given list of slots, considering the slots that are not taken.
 * @param {Object} props - The properties object.
 * @param {Array} props.slots - An array containing all available slots.
 * @param {Array} props.takenSlots - An array containing slots that are already taken.
 * @returns {(string|null)} The nearest available slot, or null if no slot is available.
 */
export const getClosestAvailableSlot = (props: Props) => {
  const { slots, takenSlots } = props;
  let nearestAvailableSlot = null;

  // Find available slots
  for (let i = 0; i < slots.length; i++) {
    if (!takenSlots.includes(slots[i])) {
      nearestAvailableSlot = slots[i];
      break;
    }
  }

  return nearestAvailableSlot ?? 0 + 1;
};
