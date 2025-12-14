/**
 * Utility to check if a user is a FutureAtoms team member
 * Note: This is used for internal features/testing
 */
export function isContinueTeamMember(email?: string): boolean {
  if (!email) return false;
  return email.includes("@futureatoms.com");
}
