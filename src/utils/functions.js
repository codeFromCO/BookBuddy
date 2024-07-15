export const normalizeString = (input) => {
  return input.trim().toLowerCase();
};

export const sortAlphabetically = (data) => {
  return data.sort((a, b) => a.title.localeCompare(b.title));
};

export const sortAddedNewOld = (data) => {
  return data.sort((a, b) => new Date(b.added) - new Date(a.added));
};
export const sortAddedOldNew = (data) => {
  return data.sort((a, b) => new Date(a.added) - new Date(b.added));
};

export const sortUpdatedNewOld = (data) => {
  return data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
};
export const sortUpdatedOldNew = (data) => {
  return data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
};
