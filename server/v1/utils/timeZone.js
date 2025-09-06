const { DateTime } = require("luxon");

const formatDateToHaNoi = (data) => {
  if (!data || typeof data !== "object") return data;

  const copy = Array.isArray(data) ? [...data] : { ...data };

  for (const key in copy) {
    if (copy[key] instanceof Date) {
      copy[key] = DateTime.fromJSDate(copy[key])
        .setZone("Asia/Ho_Chi_Minh")
        .toFormat("yyyy-MM-dd HH:mm");
    } else if (typeof copy[key] === "object") {
      copy[key] = formatDateToHaNoi(copy[key]);
    }
  }

  return copy;
};

const timeZoneMiddleware = (req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    return oldJson.call(this, formatDateToHaNoi(data));
  };
  next();
};

module.exports = timeZoneMiddleware;
