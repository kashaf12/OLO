export type AddFilterProps = {
  visible: boolean;
  onModalToggle: () => void;
  setFilter: (v: { value: string; title: string }) => void;
};
