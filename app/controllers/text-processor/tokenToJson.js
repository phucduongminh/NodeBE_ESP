exports.tokenToJson = (token) => {
  const parts = token.split("-");
  const decoded = {};

  // Improved command building
  decoded.command = parts
    .filter((part) => {
      return isNaN(part) && !part.includes("h"); // Filter out numbers and time parts
    })
    .join("-"); // Join remaining parts to form the command

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (!isNaN(part) && !part.includes("h")) {
      decoded.ordinal = parseInt(part);
    } else if (part.includes("h")) {
      decoded.time = parseInt(part);
    }
  }

  return decoded;
};
