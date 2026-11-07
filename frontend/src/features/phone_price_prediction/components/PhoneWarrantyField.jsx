import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { warrantyOptions } from '../data/phoneOptions.js';

const PhoneWarrantyField = ({ value, onChange }) => (
  <FormControl>
    <FormLabel sx={{ fontSize: '0.85rem', mb: 0.5 }}>Warranty</FormLabel>
    <RadioGroup row value={value} onChange={onChange}>
      {warrantyOptions.map(({ value: option, label }) => (
        <FormControlLabel
          key={option}
          value={option.toLowerCase()}
          control={<Radio />}
          label={label}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default PhoneWarrantyField;
