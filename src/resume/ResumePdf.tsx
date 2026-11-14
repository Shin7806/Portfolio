import { Document, Font, Link, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';
import { brandPaths } from '../data/brand-icons';
import { certificationsByLength, contacts, education, experience, languages, lineIcons, logoPaths, person, projects, site, skills, type Contact } from './data';

// The web résumé, set compact for one A4 page: same header, rules, sidebar panel and type.
const C = { ink: '#121212', body: '#3D3D3D', muted: '#696969', light: '#8F8F8F', line: '#D4D1CC', rule: '#E8E5E0', side: '#F7F5F0', accent: '#C01F3A', accentSoft: '#E6A3AF', mark: '#202024' };

export type ResumeFonts = { sans400: string; sans500: string; sans600: string; serif500: string };

let registered = false;
/** Fonts come in as URLs (browser) or file paths (tests). Words are never hyphenated. */
export function registerResumeFonts(fonts: ResumeFonts) {
  if (registered) return;
  registered = true;
  Font.register({ family: 'Inter', fonts: [{ src: fonts.sans400, fontWeight: 400 }, { src: fonts.sans500, fontWeight: 500 }, { src: fonts.sans600, fontWeight: 600 }] });
  Font.register({ family: 'Newsreader', src: fonts.serif500, fontWeight: 500 });
  Font.registerHyphenationCallback(word => [word]);
}

const PAD = 36;
const s = StyleSheet.create({
  page: { fontFamily: 'Inter', fontSize: 8, color: C.body, lineHeight: 1.5, backgroundColor: '#FFFFFF', flexDirection: 'column' },

  head: { paddingTop: 27, paddingHorizontal: PAD },
  headTop: { marginBottom: 11 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontFamily: 'Newsreader', fontWeight: 500, fontSize: 30, color: C.ink, letterSpacing: -0.5, lineHeight: 1 },
  role: { marginTop: 8, fontSize: 10, fontWeight: 500, color: C.ink, lineHeight: 1.3 },
  meta: { flexDirection: 'row', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', textDecoration: 'none' },
  metaText: { fontSize: 7.8, lineHeight: 1, color: C.muted, marginLeft: 4 },
  sep: { width: 0.6, height: 9, backgroundColor: C.line, marginHorizontal: 9 },
  mark: { width: 26, height: 26, borderRadius: 6.5, backgroundColor: C.mark, alignItems: 'center', justifyContent: 'center' },
  status: { flexDirection: 'row', alignItems: 'center', paddingTop: 3.3, paddingBottom: 4.5, paddingHorizontal: 7, borderWidth: 0.6, borderColor: C.accentSoft },
  dot: { width: 3.6, height: 3.6, borderRadius: 1.8, backgroundColor: C.accent, marginRight: 5, marginTop: 1 },
  statusText: { lineHeight: 1, fontSize: 5.8, fontWeight: 600, letterSpacing: 0.9, textTransform: 'uppercase', color: C.accent },

  contacts: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7.5, borderTopWidth: 0.6, borderTopColor: C.line },
  contact: { flexDirection: 'row', alignItems: 'center', textDecoration: 'none' },
  contactText: { fontSize: 7.6, lineHeight: 1, fontWeight: 500, color: C.ink, marginLeft: 4 },

  body: { flexDirection: 'row', flexGrow: 1, borderTopWidth: 0.6, borderTopColor: C.line },
  main: { width: '65%', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 18, paddingLeft: PAD, paddingRight: 20, borderRightWidth: 0.6, borderRightColor: C.line },
  aside: { width: '35%', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 18, paddingHorizontal: 18, backgroundColor: C.side },
  section: { marginBottom: 10 },

  title: { flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  titleText: { fontSize: 5.8, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: C.accent },
  titleRule: { flexGrow: 1, height: 0.6, backgroundColor: C.line, marginLeft: 7 },
  sideTitle: { fontSize: 5.8, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: C.accent, paddingBottom: 5, marginBottom: 8, borderBottomWidth: 0.6, borderBottomColor: C.line },

  summary: { fontSize: 8.2, lineHeight: 1.6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  roleTitle: { fontSize: 9.4, fontWeight: 600, color: C.ink },
  dates: { fontSize: 7.2, color: C.muted },
  org: { marginTop: 2, fontSize: 6.2, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase', color: C.light },
  text: { marginTop: 4, fontSize: 7.9, lineHeight: 1.55 },
  roleItem: { marginBottom: 12 },
  points: { marginTop: 4, paddingLeft: 8, borderLeftWidth: 0.6, borderLeftColor: C.line },
  point: { flexDirection: 'row', marginBottom: 2.5 },
  dash: { width: 11, color: C.line },

  project: { paddingVertical: 9, borderBottomWidth: 0.6, borderBottomColor: C.line },
  projectName: { fontFamily: 'Newsreader', fontWeight: 500, fontSize: 12, color: C.ink, lineHeight: 1.15 },
  projectHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  ctaBase: { paddingBottom: 4.9 },
  cta: { flexDirection: 'row', alignItems: 'center', textDecoration: 'none' },
  ctaText: { fontSize: 6.8, fontWeight: 500, color: C.accent, marginRight: 2.5, lineHeight: 1 },

  certs: { flexDirection: 'row', justifyContent: 'space-between' },
  cert: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4.6, borderBottomWidth: 0.5, borderBottomColor: C.rule, textDecoration: 'none' },
  certText: { fontSize: 7.6, color: C.body },

  group: { marginBottom: 8 },
  pills: { flexDirection: 'row', flexWrap: 'wrap' },
  pill: { fontSize: 7, lineHeight: 1, color: C.body, backgroundColor: '#FFFFFF', borderWidth: 0.6, borderColor: C.line, paddingTop: 3.2, paddingBottom: 3.4, paddingHorizontal: 5.5, marginRight: 3.5, marginBottom: 3.5 },
  langRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  langName: { fontSize: 8, fontWeight: 600, color: C.ink },
  langLevel: { fontSize: 7.2, color: C.muted },
  eduTitle: { fontSize: 8, fontWeight: 600, color: C.ink, lineHeight: 1.4 },
  eduLine: { fontSize: 7.4, color: C.body },
});

const linkedin = 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM6 7.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0zM6.25 10h2.5v8h-2.5zM10.75 10h2.4v1.1c.5-.8 1.5-1.35 2.75-1.35c2.1 0 3.1 1.3 3.1 3.6V18h-2.5v-4.2c0-1.1-.45-1.8-1.45-1.8s-1.8.75-1.8 1.95V18h-2.5z';

// Icons are nudged down by a measured amount (a top margin moves a centred item half as far) so their centre sits on the text's cap-height centre.
function Line({ paths, size = 7.5, color = C.light, nudge = 0 }: { paths: string[]; size?: number; color?: string; nudge?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginTop: nudge }}>{paths.map(d => <Path key={d} d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />)}</Svg>;
}

function Icon({ kind }: { kind: Contact['kind'] }) {
  if (kind === 'web') return <Line paths={lineIcons.web} nudge={1.6} />;
  return <Svg width={7.5} height={7.5} viewBox="0 0 24 24" style={{ marginTop: 1.6 }}><Path d={kind === 'linkedin' ? linkedin : brandPaths[kind]} fill={C.light} fillRule="evenodd" /></Svg>;
}

const Arrow = ({ color = C.accent }: { color?: string }) => <Line paths={lineIcons.arrow} size={5.5} color={color} />;
const Sep = () => <View style={s.sep} />;

function Title({ children }: { children: string }) {
  return <View style={s.title} minPresenceAhead={40}><Text style={s.titleText}>{children}</Text><View style={s.titleRule} /></View>;
}

const certColumns = [certificationsByLength.slice(0, 3), certificationsByLength.slice(3)];

export function ResumeDocument() {
  return <Document title={`${person.name} — Résumé`} author={person.name} subject={person.title} keywords="product design, UX, UI, React, branding" creator={site.label} producer={site.label} language="en">
    <Page size="A4" style={s.page}>
      <View style={s.head}>
        {/* Three rows, two edges: name and mark; title; contact line and availability on one line. */}
        <View style={s.headTop}>
          <View style={s.headRow}>
            <Text style={s.name}>{person.name}</Text>
            <Link src={site.href} style={s.mark}><Svg width={16} height={16} viewBox="0 0 180 180">{logoPaths.map(d => <Path key={d} d={d} fill="#FFFFFF" />)}</Svg></Link>
          </View>
          <Text style={s.role}>{person.title}</Text>
          <View style={[s.headRow, { marginTop: 6 }]}>
            <View style={s.meta}>
              <Link src={person.email.href} style={s.metaItem}><Line paths={lineIcons.mail} nudge={2.6} /><Text style={[s.metaText, { color: C.ink }]}>{person.email.label}</Text></Link>
              <Sep />
              <View style={s.metaItem}><Line paths={lineIcons.pin} nudge={2.9} /><Text style={s.metaText}>{person.location}</Text></View>
            </View>
            <View style={s.status}><View style={s.dot} /><Text style={s.statusText}>{person.availability}</Text></View>
          </View>
        </View>
        <View style={s.contacts}>
          {contacts.map((contact, i) => <View key={contact.kind} style={{ flexDirection: 'row', alignItems: 'center' }}>
            {i > 0 && <Sep />}
            <Link src={contact.href} style={s.contact}><Icon kind={contact.kind} /><Text style={s.contactText}>{contact.label}</Text></Link>
          </View>)}
        </View>
      </View>

      <View style={s.body}>
        <View style={s.main}>
          <View style={s.section}>
            <Title>Summary</Title>
            <Text style={s.summary}>{person.summary}</Text>
          </View>

          <View style={s.section}>
            <Title>Experience</Title>
            {experience.map(role => <View key={role.title} style={s.roleItem} wrap={false}>
              <View style={s.row}><Text style={s.roleTitle}>{role.title}</Text><Text style={s.dates}>{role.dates}</Text></View>
              <Text style={s.org}>{role.org}{role.place ? ` · ${role.place}` : ''}</Text>
              <Text style={s.text}>{role.summary}</Text>
              {role.points.length > 0 && <View style={s.points}>{role.points.map(point => <View key={point} style={s.point}><Text style={s.dash}>—</Text><Text style={{ flex: 1 }}>{point}</Text></View>)}</View>}
            </View>)}
          </View>

          <View style={s.section}>
            <Title>Selected Projects</Title>
            {projects.map((project, i) => <View key={project.name} style={[s.project, i === 0 ? { paddingTop: 0 } : {}, i === projects.length - 1 ? { borderBottomWidth: 0, paddingBottom: 0 } : {}]} wrap={false}>
              {/* One link per project: its page on the site, which leads on to the live product or Behance. */}
              <View style={s.projectHead}>
                <Text style={s.projectName}>{project.name}</Text>
                <Link src={`${site.href}${project.page}`} style={[s.cta, s.ctaBase]}><Text style={s.ctaText}>{`${site.label}${project.page}`}</Text><Arrow /></Link>
              </View>
              <Text style={s.text}>{project.line}</Text>
            </View>)}
          </View>

          <View style={[s.section, { marginBottom: 0 }]}>
            <Title>Certifications</Title>
            <View style={s.certs}>{certColumns.map((column, i) => <View key={i} style={{ width: i ? '41%' : '55%' }}>
              {column.map((cert, j) => <Link key={cert.name} src={cert.href} style={[s.cert, j === column.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                <Text style={s.certText}>{cert.name}</Text>
                <Arrow color={C.light} />
              </Link>)}
            </View>)}</View>
          </View>
        </View>

        <View style={s.aside}>
          {skills.map(group => <View key={group.title} style={s.group}>
            <Text style={s.sideTitle}>{group.title}</Text>
            <View style={s.pills}>{group.items.map(item => <Text key={item} style={s.pill}>{item}</Text>)}</View>
          </View>)}
          <View style={s.group}>
            <Text style={s.sideTitle}>Languages</Text>
            {languages.map(item => <View key={item.name} style={s.langRow}><Text style={s.langName}>{item.name}</Text><Text style={s.langLevel}>{item.level}</Text></View>)}
          </View>
          <View style={[s.group, { marginBottom: 0 }]}>
            <Text style={s.sideTitle}>Education</Text>
            {education.map((item, i) => <View key={item.title} style={{ marginBottom: i ? 0 : 8 }}>
              <Text style={s.eduTitle}>{item.title}</Text>
              <Text style={s.eduLine}>{item.place}</Text>
              <Text style={s.eduLine}>{item.dates}</Text>
            </View>)}
          </View>
        </View>
      </View>
    </Page>
  </Document>;
}
