import { Container } from '@mui/system';
import { Header } from '../components/header';
import { HomePage } from '../pages';

export function Router() {
  return (
    <div>
      <Header />
      <Container maxWidth='sm' sx={{ padding: '1rem' }}>
        <HomePage />
      </Container>
    </div>
  );
}
