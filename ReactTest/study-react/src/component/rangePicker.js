import React, { useEffect, useState } from "react"
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const RangePickerComponent = () => {
    // range picker range preset
    const rangePresets = [
        {
          label: '오늘',
          value: [dayjs(), dayjs()],
        },
        {
          label: '어제',
          value: [dayjs().add(-1, 'd'), dayjs()],
        },
        {
          label: '최근 7일',
          value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
          label: '최근 14일',
          value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
          label: '최근 30일',
          value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
          label: '최근 90일',
          value: [dayjs().add(-90, 'd'), dayjs()],
        },
        {
          label: '최근 100일',
          value: [dayjs().add(-100, 'd'), dayjs()],
        },
    ];
    // variables
    const [selectedRange, setSelectedRange] = useState(null);
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const prevMonth = String(current.getMonth() ).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const date2 = `${year}-${prevMonth}-${day}`;
    // onload preset for 1 month previous until today
    useEffect(() => {
      const monthBefore = moment().subtract(1, 'month');
      const today = moment();

      setSelectedRange([monthBefore, today])
    }, []);
    // range picker onchange handler
    const handleRangeChange = (dates) => {
        setSelectedRange(dates);
        console.log('range change', dates);
    };
    // actual rendering part
    return (
        <RangePicker presets={rangePresets} onChange={handleRangeChange}/>
    )
}
export default RangePickerComponent