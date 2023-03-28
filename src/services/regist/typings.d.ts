declare namespace API {
  type ResistBody = {
    username: string;
    password: string;
    level: string;
    clazzid: number;
    university?: string;
    major?: string;
    passques?: string;
    passans?: string;
    password_r: string;
  };
}
