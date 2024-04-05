import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}

export async function isPasswordValid(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}