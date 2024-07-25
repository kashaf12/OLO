export type BackButtonProps = {
  icon?: string;
  iconColor: string;
};

export type LeftButtonProps = {
  action?: string;
  icon?: string;
  iconColor: string;
  navigate?: () => void;
};

export type RightButtonProps = {
  icon?: string;
  iconColor: string;
  onPress?: () => void;
  share?: () => void;
  title?: string;
  onPressRight?: () => void;
};
