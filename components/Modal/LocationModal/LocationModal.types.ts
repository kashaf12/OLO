export type LocationModalProps = {
  loading: boolean;
  data: { zones: { id: string; title: string }[] };
  setFilters: (s: any) => void;
  onModalToggle: () => void;
  visible: boolean;
  onPressStorageLocation: () => void;
  error?: { message: string };
};
