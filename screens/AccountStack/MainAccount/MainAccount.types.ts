export type MainAccountProps = {
  onPressHelp?: () => void;
  onPressSettings?: () => void;
  onPressProfile?: () => void;
  onPressLogin?: () => void;
  onPressNetwork?: () => void;
  isAuthenticated?: boolean;
  userName?: string;
};
