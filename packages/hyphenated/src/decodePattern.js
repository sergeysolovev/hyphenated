export const decodePattern = pattern => {
  return {
    chars: pattern.replace(/[0-9]/g, ''),
    points: pattern
      .split(/[.'᾿\p{L}\p{M}\p{Z}\p{C}-]/u)
      .map(x => parseInt(x || 0))
  };
};
