import { Container } from '@mui/system';
import { Header } from '../common/header';
import { HomePage } from '../pages';

export function Router() {
  return (
    <div>
      <Header />
      <Container maxWidth='sm'>
        <HomePage />
      </Container>
    </div>
  );
}
