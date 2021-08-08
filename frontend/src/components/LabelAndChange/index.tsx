import { ReactNode } from 'react';
import { TextareaHTMLAttributes } from 'react';
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import './styles.scss';

type LabelInputProps = 
  InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
{
  name: string;
  input?: boolean;
  textarea?: boolean;
  select?: boolean;
  span?: boolean;
  children?: ReactNode;
}

export function LabelAndChange({
  name, 
  input = false,
  textarea = false,
  select = false, 
  span = false,
  children,
  ...props
}: LabelInputProps) {

  return(
    <div id="LabelAndChange" >
      {input ? (
        <div>
          <label>{name}</label>
          <input {...props} />
        </div>
      ) : false}
      {textarea ? (
        <div>
          <label>{name}</label>
          <textarea {...props} />
        </div>
      ) : false}
      {select ? (
        <div>
          <label>{name}</label>
          <select {...props} >
            {children}
          </select>
        </div>
      ) : false}
      {span ? (
        <div>
          <label>{name}</label>
          <span {...props} >
            {children}
          </span>
        </div>
      ) : false}
    </div>
  );
}