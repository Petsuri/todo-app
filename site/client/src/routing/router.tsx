import { Container } from '@mui/system';
import { Header } from '../common/header';
import { HomePage } from '../pages';

export function Router() {
  return (
    <Container>
      <Header />
      <HomePage />
    </Container>
  );
}
