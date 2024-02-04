function sanitizeString(input) {
  const sanitizedString = input.replace(/(^['"*]+)|(['"*]+$)/g, '');

  return sanitizedString;
}

export default sanitizeString;
