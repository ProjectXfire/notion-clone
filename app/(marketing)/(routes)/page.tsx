import { Footer, Heading, Heroes, Landing, Presentation } from '../_components';

export default function MarketingPage(): JSX.Element {
  return (
    <Landing>
      <Presentation>
        <Heading />
        <Heroes />
      </Presentation>
      <Footer />
    </Landing>
  );
}
