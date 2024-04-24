import React, { useState } from "react";
import Select, {
  components,
  StylesConfig,
  OptionProps,
  ActionMeta,
  MultiValue,
} from "react-select";
import { useQuery } from "react-query";
import { searchCharacters } from "../services/api";

interface CharacterOption {
  value: string;
  label: string;
  image: string;
  episode_counts: number;
}

const customStyles: StylesConfig<CharacterOption, true> = {
  control: (provided) => ({
    ...provided,
    minWidth: "600px",
    maxWidth: "600px",
  }),
};

const CharacterSelect = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    data: characters,
    isLoading,
    isError,
  } = useQuery(["characters", inputValue], () => searchCharacters(inputValue), {
    enabled: !!inputValue,
    keepPreviousData: true,
  });
  const [selectedValues, setSelectedValues] = useState<
    MultiValue<CharacterOption>
  >([]);

  const formattedOptions =
    characters?.map((character: any) => ({
      value: character.id,
      label: character.name,
      image: character.image,
      episode_counts: character.episode_count,
    })) || [];

  const handleChange = (
    newValue: MultiValue<CharacterOption>,
    actionMeta: ActionMeta<CharacterOption>
  ) => {
    setSelectedValues(newValue);
    console.log("Selected Values:", newValue);
  };

  const Option = (props: OptionProps<CharacterOption, true>) => {
    const labelParts = props.data.label.split(
      new RegExp(`(${inputValue})`, "gi")
    );
    const isChecked = selectedValues.some(
      (selected) => selected.value === props.data.value
    );

    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" checked={isChecked} />
          <img
            src={props.data.image}
            style={{ width: 35, height: 35, borderRadius: "8px" }}
            alt={props.data.label}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "5px",
            }}
          >
            <h1 style={{ fontSize: "14px", fontWeight: "400" }}>
              {labelParts.map((part: string, index: number) =>
                part.toLowerCase() === inputValue.toLowerCase() ? (
                  <b key={index}>{part}</b>
                ) : (
                  part
                )
              )}
            </h1>
            <h6 style={{ fontWeight: "400", fontSize: "14px" }}>
              {props.data.episode_counts} Episodes
            </h6>
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <>
      {isError && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          No data found for the given query.
        </div>
      )}

      <Select
        components={{ Option }}
        isMulti
        options={formattedOptions}
        value={selectedValues}
        onChange={handleChange}
        onInputChange={setInputValue}
        isLoading={isLoading}
        closeMenuOnSelect={false}
        styles={customStyles}
        placeholder="Search for a character"
        hideSelectedOptions={false}
      />
    </>
  );
};

export default CharacterSelect;
