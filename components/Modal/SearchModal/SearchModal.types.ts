export type SearchModalProps = {
  setSearch: (s: string) => void;
  onModalToggle: () => void;
  visible: boolean;
  categories: {
    title: string;
  }[];
};
