import { getCurrentLocationResponse } from '@/hooks/useLocationPermission/types';

export type SellingFormProps = {
  onPressNext?: (value: FormValueType) => void;
};

export type ErrorType = {
  category?: string | null;
  title?: string | null;
  description?: string | null;
  location?: string | null;
  price?: string | null;
  working?: string | null;
};

export type FormValueType = {
  category?: string;
  title?: string;
  description?: string;
  price?: string;
  working?: string;
  location?: Pick<getCurrentLocationResponse, 'address' | 'coords'> | null;
};

export type ColorValueType = FormValueType & {
  location: string;
};
