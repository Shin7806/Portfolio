import SiteFrame from './components/SiteFrame';
import Hero from './components/Hero';
import Work from './components/Work';
import Archive from './components/Archive';
import ToolStack from './components/ToolStack';
import Lab from './components/Lab';
import Contact from './components/Contact';
import { useMeta } from './components/Primitives';
import './styles/home.css';

export default function Portfolio() {
  useMeta('Dhruv Poddar', 'Dhruv Poddar is a product designer in Bengaluru who designs and builds interfaces end to end: RS360, NeuroTwin, SkillBridge and LogoFolio.');
  return <SiteFrame closing={<Contact />}>
    <Hero />
    <Work />
    <Archive />
    <ToolStack />
    <Lab />
  </SiteFrame>;
}
