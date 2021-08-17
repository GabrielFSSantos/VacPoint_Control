import { ReactNode, useState } from 'react';
import DatePicker from 'react-datepicker';

import { Toggle } from '../Toggle';
import { Dosage } from '../../service/models/Dosage';

import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

type ModalProps = {
  title?: string;
  vaccine?: boolean;
  dosage?: boolean;
  dosageInfos?: Dosage
  handleToDate?: (dosageId: string, date: Date) => void;
  handleToToggle?: (dosageId: string, took: boolean) => void;
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
  const parts = dosageInfos?.date?.split("/") || [];
  const initialDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  const [date, setDate] = useState<Date>(initialDate);

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
              placeholderText='dia/mês/ano'
              dateFormat='dd/MM/yy'
              selected={new Date(date || Date.now())}
              onChange={element => {
                setDate(new Date(element?.toString() || Date.now()));
                if(handleToDate) {
                  handleToDate(
                    dosageInfos?._id || '', 
                    new Date(element?.toString() || Date.now())
                  );
                }
              }}
            />
          </div>

          <Toggle 
            title=""
            defaultChecked={dosageInfos?.took}
            onChange={event => {if(handleToToggle) handleToToggle(dosageInfos?._id || '', event.target.checked)}}
          />
        </div>
      ) : false}
    </div>
  );
}