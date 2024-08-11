import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { CategoryPickerProps } from './CategoryPicker.types';
import styles from './styles';

import CategoryQuestion from '@/assets/category.json';

function getItems() {
  return Object.entries(CategoryQuestion).reduce(
    (acc: { label: string; value: string; parent?: string }[], [category, subcategories]) => {
      acc.push({ label: category, value: category });

      Object.keys(subcategories).forEach((c) => {
        acc.push({ label: c, value: c, parent: category });
      });

      return acc;
    },
    []
  );
}

const CategoryPicker = ({ onSelectCategory, selectedCategory = null }: CategoryPickerProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedCategory);
  const [items, setItems] = useState<{ label: string; value: string }[]>(getItems());

  const handleValueChange = (itemValue: string | null) => {
    if (itemValue) {
      const [category, subcategory] = itemValue.split('|');
      onSelectCategory(category, subcategory);
    }
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={handleValueChange}
      placeholder="Select a category"
      searchable
      searchPlaceholder="Search for a category"
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
      listMode="MODAL"
      categorySelectable={false}
    />
  );
};

export default CategoryPicker;
