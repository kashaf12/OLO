export type ProfileProps = {
  name: string;
  onPressEditProfile?: () => void;
  profilePhotoUrl?: string | null;
  description?: string | null;
};
