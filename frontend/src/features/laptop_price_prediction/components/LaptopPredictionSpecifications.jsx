import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { laptopBrandOptions } from '../data/laptopOptions.js';
import { tokens } from '../../../theme.js';

const LaptopPredictionSpecifications = ({ values }) => {
  if (!values) {
    return null;
  }

  const brand =
    laptopBrandOptions.find((option) => option.value === values.brand)?.label ??
    values.brand;
  const specifications = [
    brand,
    values.processor,
    `${values.ram} GB RAM`,
    values.storageType === 'Unspecified'
      ? `${values.rom} GB storage`
      : `${values.rom} GB ${values.storageType}`,
    `${values.screenSize}" screen`,
    Number(values.warranty) > 0
      ? `${values.warranty} days warranty`
      : 'No warranty',
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

export default LaptopPredictionSpecifications;
