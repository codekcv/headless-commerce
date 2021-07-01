import { Input } from 'antd';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import styles from './FormItem.module.css';

type Props = {
  className: string;
  name: string;
  label: string;
  placeholder: string;
  inputType: 'Group' | 'Password' | 'Search' | 'TextArea';
};

const FormInput = (props: Props) => {
  const { className, name, label, placeholder, inputType } = props;
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const lastMessage = useRef(null);
  const {
    field: { onChange, onBlur },
  } = useController({ name, control });

  const FormInput = inputType ? Input[inputType] : Input;
  const message = errors[name]?.message;

  if (!lastMessage.current && message) {
    lastMessage.current = message;
  }

  return (
    <div className={`${className} ${styles.container}`}>
      <label>{label}</label>
      <FormInput
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
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
};

export default FormInput;
