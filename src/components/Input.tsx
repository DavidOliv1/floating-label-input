import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { cn } from '../libs/cn';
import { IoMdAlert } from 'react-icons/io';
import { InputHTMLAttributes } from 'react';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  errors,
  required,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          'peer rounded p-3 w-full bg-white border-[1px] border-gray-300 outline-none focus:border-blue-500 focus:border-2 transition disabled:bg-transparent',
          { 'border-red-500': errors[id], 'focus:border-red-500': errors[id] },
          className,
        )}
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        {...rest}
      />
      <label
        className={cn(
          'absolute left-3 -top-3 text-gray-600 bg-white px-1 text-sm font-normal cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:translate-y-[23px] peer-focus:text-blue-500 peer-focus:translate-y-0 peer-focus:text-sm transition-all',
          { 'peer-focus:text-red-500': errors[id] },
        )}
        htmlFor={id}
      >
        {label}
      </label>
      {errors[id] && (
        <div className="flex flex-row items-center text-sm mt-1 text-red-500">
          <IoMdAlert className="mr-1" />
          {`${errors[id]?.message}`}
        </div>
      )}
    </div>
  );
};

export default Input;
