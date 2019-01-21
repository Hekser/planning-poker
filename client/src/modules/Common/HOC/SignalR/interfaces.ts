export interface Member {
  ConnectionId: string;
  Nick: string;
  Role: MemberRole;
}

export enum MemberRole {
  "Admin" = 1,
  "Member" = 2
}
