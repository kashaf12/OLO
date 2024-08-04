import { UserType } from '@/store/userInfo';

export type EditProfileProps = {
  user: UserType;
  saveImageOnBackend?: (src: string | null) => Promise<string | null>;
};

export type EditProfileI = {
  onSave: () => Partial<UserType> | null;
};
