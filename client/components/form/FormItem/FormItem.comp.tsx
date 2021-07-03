import { Input } from 'antd';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import styles from './FormItem.module.css';

type Props = {
  className?: string;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  inputType?: 'Group' | 'Password' | 'Search' | 'TextArea';
};

const FormInput = (props: Props): JSX.Element => {
  const { className, name, label, placeholder, inputType, disabled } = props;
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const lastMessage = useRef(null);
  const {
    field: { onChange, onBlur },
  } = useController({ name, control });

  const InputType = inputType ? Input[inputType] : Input;
  const message = errors[name]?.message;

  if (!lastMessage.current && message) {
    lastMessage.current = message;
  }

  return (
    <div className={`${className} ${styles.container}`}>
      <label htmlFor={label}>{label}</label>

      <InputType
        id={label}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />

      <div className={styles.messageContainer}>
        <p
          className={styles.message}
          style={{
            transform: `translateY(${message ? 0 : '-4px'})`,
            opacity: message ? 1 : 0,
          }}
        >
          {lastMessage.current}
        </p>
      </div>
    </div>
  );
};

FormInput.defaultProps = {
  className: '',
  placeholder: '',
  inputType: '',
  disabled: false,
};

export default FormInput;
