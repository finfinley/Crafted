export enum Pronouns {
    HeHim = "He / Him",
    SheHer = "She / Her",
    TheyThem = "They / Them",
    NoPronouns = "No Pronouns",
    AnyPronouns = "Any Pronouns",
  }
  
  export type ProfileFormValues = {
    avatar: string;
    handle: string;
    location: string;
    bio: string;
    email: string;
    pronouns: {
      selected: Pronouns;
      visible: boolean;
    };
    birthday: Date;
  };
  
  export type UpdateProfileFuncProps = ProfileFormValues & {
    setLoading: (loading: boolean) => void;
    session: any;
  };