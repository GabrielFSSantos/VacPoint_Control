import { ReactNode } from 'react';
import DatePicker from 'react-datepicker';

import { Toggle } from '../Toggle';

import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { Dosage } from '../../service/models/Dosage';

type ModalProps = {
  title?: string;
  vaccine?: boolean;
  dosage?: boolean;
  dosageInfos?: Dosage
  handleToDate?: (dosageId: string, date: Date | [Date | null, Date | null] | null) => void;
  handleToToggle?: (dosageId: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;

  custom?: boolean,
}

export function Card({ 
  title, 
  dosageInfos, 
  handleToDate, 
  handleToToggle,
  vaccine = false, 
  dosage = false }: ModalProps) 
{
  return(
    <div id="Card" >
      {vaccine ? (
        <div className="vaccineCard">
          {title}
        </div>
      ) : false}
      {dosage ? (
        <div className="dosageCard">
          <label>{`Dosagem ${dosageInfos?.dosageNumber}`}</label>

          <div className="data">
            <label>Data:</label>
            <DatePicker
              wrapperClassName="datePicker"
              placeholderText='DD/MM/YYYY'
              dateFormat='dd/MM/yyyy'
              selected={dosageInfos?.date !== '' ? new Date(dosageInfos?.date || Date.now()) : undefined}
              onChange={date => {if(handleToDate) handleToDate(dosageInfos?._id || '', date)}}
            />
          </div>

          <Toggle 
            title=""
            defaultChecked={dosageInfos?.took}
            onChange={event => {if(handleToToggle) handleToToggle(dosageInfos?._id || '', event)}}
          />
        </div>
      ) : false}
    </div>
  );
}