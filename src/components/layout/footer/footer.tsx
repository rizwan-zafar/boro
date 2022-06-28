import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="pt-[50px] lg:pt-14 2xl:pt-16 bg-brand">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
  </footer>
);

export default Footer;
