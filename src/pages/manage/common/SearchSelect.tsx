import { For, createEffect, createSignal } from "solid-js"

export interface SearchSelectOption {
  label: string
  value: string | number
}

export interface SearchSelectProps {
  options: SearchSelectOption[]
}

export const SearchSelect = (props: SearchSelectProps) => {
  let selectRef: HTMLSelectElement = null
  const { options } = props
  const [inputValue, setInputValue] = createSignal<string>("")
  const [selectValue, setSearchValue] = createSignal<string>("")

  createEffect((prev) => {
    const current = inputValue()
    if (selectRef && prev) {
      selectRef.showPicker()
    }

    //TODO: 1.filter select options
    return current
  }, inputValue())

  const onSearch = (event: InputEvent) => {
    const { value } = event.target
    setInputValue(value)
  }
  return (
    <div>
      <input
        class="tw-border-solid tw-border tw-border-red-500"
        value={inputValue() ?? ""}
        type="text"
        id="searchSelect"
        onkeyup={(e) => onSearch(e)}
      />
      <select
        onClick={(e) => {
          console.log("mouse down", e)
        }}
        ref={selectRef}
        value={selectValue() ?? ""}
        onChange={(e) => setSearchValue(e.target.value)}
      >
        <For each={options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
    </div>
  )
}
