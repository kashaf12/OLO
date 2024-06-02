export type SellingFormProps = {
  editProduct?: {
    title: string;
    description: string;
    zone: { id: string; title: string };
    condition: string;
  };
  onPressNext: () => void;
};
