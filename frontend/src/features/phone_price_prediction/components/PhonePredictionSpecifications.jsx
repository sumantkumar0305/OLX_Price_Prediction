import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { tokens } from '../../../theme.js';

const PhonePredictionSpecifications = ({ values }) => {
  if (!values) {
    return null;
  }

  const specifications = [
    values.brand,
    `${values.ram} GB RAM`,
    `${values.rom} GB storage`,
    values.network,
    `${values.accessories} accessories`,
    values.warranty === 'yes' ? 'Warranty included' : 'No warranty',
  ];

  return (
    <Stack spacing={1} sx={{ mt: 3, pt: 3, borderTop: `1px solid ${tokens.line}` }}>
      <Typography variant="caption" color="text.secondary">
        Prediction generated for
      </Typography>
      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75}>
        {specifications.map((specification, index) => (
          <Chip
            key={`${index}-${specification}`}
            label={specification}
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default PhonePredictionSpecifications;
