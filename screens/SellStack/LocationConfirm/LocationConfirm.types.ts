export type LocationConfirmProps = {
  onPressFullMap?: (s: { latitude: number; longitude: number }) => void;
  defaultFormData?: any;
  uploadImage?: (s: string) => Promise<string>;
  onCreateAd?: (s: {
    _id: string;
    zone: string;
    address: { latitude: string; longitude: string; address: string };
    images: string[];
    title: string;
    description: string;
    condition: string;
    subCategory: string;
    price: number;
  }) => void;
};
