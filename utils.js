const nextEpisodeNumber = episode => {
  const number = (Number(episode) + 1).toString();
  const numberOfZeroes = episode.toString().length - number.length;

  return (
    Array(numberOfZeroes)
      .fill('0')
      .join('') + number
  );
};

const groupEntries = entires => {
  return entires.reduce((info, [key, value]) => {
    info[key] = value;
    return info;
  }, {});
};

module.exports = {
  nextEpisodeNumber,
  groupEntries,
};
