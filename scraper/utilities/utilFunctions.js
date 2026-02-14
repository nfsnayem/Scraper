export function extractRamValue(ramString) {
  // Match the first number followed by 'GB' or 'MB'
  const match = ramString.match(/^(\d+)(?:\s*(?:GB|MB))?/i);
  if (match) {
    return parseInt(match[1], 10); // Convert to integer
  }
  return 0; // Return null if no match is found
}

export function convertToGB(romString) {
  // Match the first number followed by 'GB', 'MB', or 'TB'
  const match = romString.match(/^(\d+)(?:\s*(GB|MB|TB))?/i);

  if (match) {
    const value = parseInt(match[1], 10); // The numeric value
    const unit = (match[2] || 'GB').toUpperCase(); // Default to 'GB' if no unit is found

    let result;

    // Convert the value to GB based on the unit
    switch (unit) {
      case 'TB':
        result = value * 1024; // Convert TB to GB
        break;
      case 'MB':
        result = value / 1024; // Convert MB to GB
        break;
      case 'GB':
      default:
        result = value; // If it's already GB, return as is
        break;
    }

    // Round to 2 decimal places to avoid floating point precision issues
    return Math.round(result * 100) / 100;
  }

  return null; // Return null if no match is found
}

export function extractBatteryCapacity(batteryString) {
  // Match the numeric part of the string (capacity), followed by optional unit (mAh or Wh)
  const match = batteryString.match(/(\d+)(mAh|Wh)?/);

  if (match) {
    return parseInt(match[1], 10); // Return the numeric value (capacity)
  }

  return 0; // Return null if no numeric value is found
}
export function extractDisplaySize(displayString) {
  // Match the first numeric value before the inches symbol ('')
  const match = displayString.match(/^(\d+(\.\d+)?)''/);

  if (match) {
    return parseFloat(match[1]); // Return the numeric value as a float
  }

  return null; // Return null if no valid display size is found
}

export function extractLargestNetwork(networkString) {
  // Match all the network numbers (e.g., 2, 3, 4, 5)
  const matches = networkString.match(/\d+/g);

  if (matches) {
    // Convert the matches to numbers and find the largest
    const networkNumbers = matches.map(Number);
    return Math.max(...networkNumbers); // Return the largest number
  }

  return null; // Return null if no numbers are found
}
