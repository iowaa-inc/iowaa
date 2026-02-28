import { VoiceProfileModule } from "../registry";
import * as React from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@repo/ui-core/components/combobox";

// Reuse region options from region module
const regionOptions = [
  { value: "ng", label: "Nigerian" },
  { value: "us", label: "American" },
  { value: "uk", label: "British" },
  { value: "gh", label: "Ghanaian" },
  { value: "wa", label: "West African" },
  { value: "ea", label: "East African" },
  { value: "sa", label: "South African" },
  { value: "ca", label: "Caribbean" },
  { value: "in", label: "Indian" },
  { value: "eu", label: "European (non-British)" },
];

type RegionOption = {
  value: string;
  label: string;
};

const MAX_REGIONS = 3;

function Component() {
  const anchor = useComboboxAnchor();
  const [selected, setSelected] = React.useState<RegionOption[]>([]);

  // Only allow up to MAX_REGIONS selections, but allow swap/remove/add new
  const handleValueChange = (nextSelected: RegionOption[]) => {
    // If the user is adding (nextSelected longer), only allow if <= MAX, else replace the oldest one
    if (nextSelected.length > MAX_REGIONS) {
      // swap the last-selected in, removing the first-selected
      // assume Combobox always appends new selections to the end
      // We'll take the last MAX_REGIONS items from nextSelected
      setSelected(nextSelected.slice(-MAX_REGIONS));
    } else {
      setSelected(nextSelected);
    }
  };

  return (
    <Combobox
      multiple
      autoHighlight
      items={regionOptions}
      value={selected}
      onValueChange={handleValueChange}
      itemToStringValue={option => option ? option.label : ""}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values: RegionOption[]) => (
            <React.Fragment>
              {(values ?? []).map(value => (
                <ComboboxChip key={value.value}>{value.label}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder="Select region(s)"
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No regions found.</ComboboxEmpty>
        <ComboboxList>
          {(option: RegionOption) => (
            <ComboboxItem
              key={option.value}
              value={option}
              // Allow selection and removal always
            >
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const AccentBlend: VoiceProfileModule = {
  key: "accent-blend",
  label: "Accent Blend",
  description: "Select up to 3 regions represented in the accent (e.g., Nigerian, British, etc.).",
  render: () => <Component />,
};
