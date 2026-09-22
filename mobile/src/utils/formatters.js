/**
 * Utility formatters for the Feedants app
 */

/**
 * Format currency in Indian Rupees
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹ 0';
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

/**
 * Format date as "DD Mon YY" (e.g., "10 Aug 26")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

/**
 * Format time as "HH:MM AM/PM"
 */
export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

/**
 * Calculate countdown from milliseconds
 */
export const formatCountdown = (milliseconds) => {
  if (milliseconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

/**
 * Format countdown as string "DDd : HHh : MMm : SSs"
 */
export const formatCountdownString = (milliseconds) => {
  const { days, hours, minutes, seconds } = formatCountdown(milliseconds);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
};

/**
 * Get spots text
 */
export const formatSpotsText = (available, total) => {
  if (available <= 0) return 'Fully Booked';
  return `Only ${available} spots left`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
