import { FC } from 'react'
import styles from './select.module.scss'
import makeAnimated from 'react-select/animated'
import { IOption, ISelect } from './select.interface'
import ReactSelect, { OnChangeValue } from 'react-select'
import formStyles from "../form-elements/form.module.scss";

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
  placeholder,
  error,
  isMulti,
  options,
  field,
  isLoading
}) => {

  const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
    field.onChange(isMulti ? (newValue as IOption[]).map(item => item.value) :
      (newValue as IOption).value)
  }

  const getValue = () => {
    if (field.value) {
      return isMulti ? options.filter(option => field.value.indexOf(option.value) >= 0) : options.find(option => option.value === field.value)
    }
    else {
      return isMulti ? [] : ''
    }
  }

  return <div className={styles.selectContainer}>
    <label>
      <span>{placeholder}</span>
      <ReactSelect
        classNamePrefix="custom-select"
        value={getValue()}
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        components={animatedComponents}
        isLoading={isLoading} />
    </label>
    {error && <div className={formStyles.error}>{error.message}</div>}
  </div>
}

export default Select