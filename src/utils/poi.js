export const toFormattedType = (type) => {
  switch (type) {
    case "historical building":
        return "Edificio storico";
    case "park":
        return "Parco";
    case "museum":
        return "Museo";
    case "theater":
        return "Teatro";
    case "department":
        return "Dipartimento";
  }

  return ""
};
