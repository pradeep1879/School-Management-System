/**
 * Convert any date to IST
 */

export const toIST = (inputDate = new Date()) => {
  return new Date(
    new Date(inputDate).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );
};


/**
 * Start of day in IST (00:00:00)
 */

export const getISTStartOfDay = (inputDate = new Date()) => {
  const date = toIST(inputDate);
  date.setHours(0, 0, 0, 0);
  return date;
};


/**
 * End of day in IST (23:59:59)
 */

export const getISTEndOfDay = (inputDate = new Date()) => {
  const date = toIST(inputDate);
  date.setHours(23, 59, 59, 999);
  return date;
};


/**
 * Current IST timestamp
 */

export const getISTNow = () => {
  return toIST(new Date());
};


/**
 * Format date as YYYY-MM-DD (IST)
 */

export const formatISTDate = (inputDate = new Date()) => {
  const date = toIST(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};