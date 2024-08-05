import { BOLD_FONT, FLORAL_GRAY, SILK_CHOCOLATE, TAN_GRAY } from "lib/styles";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "She / Her", value: "She / Her" },
  { label: "He / Him", value: "He / Him" },
  { label: "They / Them", value: "They / Them" },
  { label: "No Pronouns", value: "No Pronouns" },
  { label: "Any Pronouns", value: "Any Pronouns" },
];

const DropdownComponent = ({ setFieldValue, value, name }) => {

  return (
    <Dropdown
      style={styles.dropdown}
      itemTextStyle={styles.textItemsStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Pronouns"
      value={value}
      onChange={(item) => {
        setFieldValue(name, item?.value);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderBottomColor: FLORAL_GRAY,
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: BOLD_FONT,
    color: FLORAL_GRAY,
  },
  textItemsStyle: {
    fontSize: 14,
    fontFamily: BOLD_FONT,
    color: SILK_CHOCOLATE,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: BOLD_FONT,
    color: SILK_CHOCOLATE,
  },
});
