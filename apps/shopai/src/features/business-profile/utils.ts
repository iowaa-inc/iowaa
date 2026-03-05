/**
 * Generates 24-hour time options for time pickers
 * @returns Array of time options from 00:00 to 23:00
 */
export const generateTimeOptions = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });
};

/**
 * Validates phone number format (basic validation)
 * @param phone - Phone number to validate
 * @returns True if phone number is valid
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
