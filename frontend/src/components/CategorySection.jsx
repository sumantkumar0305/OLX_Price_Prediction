import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { categories } from '../data/categories.js';
import CategoryCard from './CategoryCard.jsx';
import ComingSoonDialog from './ComingSoonDialog.jsx';

const CategorySection = () => {
  const navigate = useNavigate();
  const [dialogCategory, setDialogCategory] = useState(null);

  const handleSelect = (category) => {
    if (category.status === 'active' && category.path) {
      navigate(category.path);
    } else {
      setDialogCategory(category);
    }
  };

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 5, maxWidth: 560 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontSize: '0.7rem' }}
          >
            PRODUCT CATEGORIES
          </Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.35rem' }, lineHeight: 1.15 }}>
            The right estimate for every device
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Mobile phone and laptop pricing are live today. Smartwatches and
            other electronics are on the roadmap &mdash; the same interface
            will support them as their models are trained.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <CategoryCard category={category} onSelect={handleSelect} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ComingSoonDialog
        open={Boolean(dialogCategory)}
        category={dialogCategory}
        onClose={() => setDialogCategory(null)}
      />
    </Box>
  );
};

export default CategorySection;
