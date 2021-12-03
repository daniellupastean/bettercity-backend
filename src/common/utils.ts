export function isValidEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function isValidUuid(id: string): boolean {
  const re =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return re.test(id);
}

export function base64Encode(bitmap) {
  return Buffer.from(bitmap).toString('base64');
}

export function generateResetToken() {
  const rand = () => Math.random().toString(36).substr(2);
  const token = (length) =>
    (rand() + rand() + rand() + rand()).substr(0, length);

  return token(10);
}
