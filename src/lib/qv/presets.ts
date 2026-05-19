import type { QVComponent, QVComponentMode, QVPreset, QVTrackOption } from './types';

const regularTrack: QVTrackOption = {
  id: 'regular',
  label: 'Regulär',
};

const informatikerTracks: QVTrackOption[] = [
  regularTrack,
  {
    id: 'bm',
    label: 'BM, IMS, WayUp',
    note: 'In diesem Modus entfallen ABU und erweiterte Grundkompetenzen; IPA und Informatikkompetenzen werden über 70% normalisiert.',
    excludedComponentIds: ['abu', 'egk'],
  },
];

const defaultTracks: QVTrackOption[] = [regularTrack];

const popularitySources = [
  {
    label: 'Yousty Lehrberufsbarometer 2026',
    href: 'https://www.funkyjobs.ch/journal/beliebteste-lehrstellen-2026',
  },
  {
    label: 'SBFI/gfs Nahtstellenbarometer 2025',
    href: 'https://cockpit.gfsbern.ch/de/cockpit/nahtstellenbarometer-2025-aug/',
  },
];

const abuSources = [
  {
    label: 'SBFI Allgemeinbildung',
    href: 'https://www.sbfi.admin.ch/de/die-allgemeinbildung-als-wichtiges-fundament-der-beruflichen-grundbildung',
  },
  {
    label: 'SBFI Mindestvorschriften ABU 2025',
    href: 'https://www.fedlex.admin.ch/eli/cc/2025/263/de',
  },
  {
    label: 'Archiv ABU-Verordnung 2006',
    href: 'https://www.fedlex.admin.ch/eli/cc/2006/510/de',
  },
];

const abuDescription = 'Erfahrungsnote, Vertiefungs-/Schlussarbeit und Schlussprüfung zählen regulär je 1/3. Sonderfälle können in den Details ausgewählt werden.';
const abuRoundingNote = 'ABU-Note auf 0.1; Sonderfälle gemäss Auswahl';

const abuEfzDetailModes: QVComponentMode[] = [
  {
    id: 'efz-standard',
    label: 'EFZ 3-/4-jährig regulär',
    description: 'Erfahrungsnote, Vertiefungs-/Schlussarbeit und Schlussprüfung zählen je ein Drittel.',
    resultRounding: 0.1,
    details: [
      { id: 'experience', label: 'Erfahrungsnote Allgemeinbildung', shortLabel: 'Erfahrung', weight: 33.3333, roundingNote: 'auf ganze oder halbe Note gerundet' },
      { id: 'work', label: 'Vertiefungs-/Schlussarbeit', shortLabel: 'VA/SA', weight: 33.3333, roundingNote: 'auf ganze oder halbe Note gerundet' },
      { id: 'exam', label: 'ABU-Schlussprüfung', shortLabel: 'Prüfung', weight: 33.3333, roundingNote: 'auf ganze oder halbe Note gerundet' },
    ],
  },
  {
    id: 'bm-transfer-late',
    label: 'BM-Übertritt im vorletzten Schulsemester',
    description: 'Vertiefungs-/Schlussarbeit und Schlussprüfung zählen je zur Hälfte.',
    resultRounding: 0.1,
    details: [
      { id: 'work', label: 'Vertiefungs-/Schlussarbeit', shortLabel: 'VA/SA', weight: 50, roundingNote: 'auf ganze oder halbe Note gerundet' },
      { id: 'exam', label: 'ABU-Schlussprüfung', shortLabel: 'Prüfung', weight: 50, roundingNote: 'auf ganze oder halbe Note gerundet' },
    ],
  },
  {
    id: 'outside-regular-education',
    label: 'Zulassung ausserhalb Bildungsgang',
    description: 'Für EFZ 3-/4-jährig zählen Vertiefungs-/Schlussarbeit und Schlussprüfung je zur Hälfte.',
    resultRounding: 0.1,
    details: [
      { id: 'work', label: 'Vertiefungs-/Schlussarbeit', shortLabel: 'VA/SA', weight: 50, roundingNote: 'auf ganze oder halbe Note gerundet' },
      { id: 'exam', label: 'ABU-Schlussprüfung', shortLabel: 'Prüfung', weight: 50, roundingNote: 'auf ganze oder halbe Note gerundet' },
    ],
  },
  {
    id: 'repeat-without-abu-school',
    label: 'Wiederholung ohne ABU-Unterricht',
    description: 'Bisherige Erfahrungsnote, neue Vertiefungs-/Schlussarbeit und neue Schlussprüfung zählen je ein Drittel.',
    resultRounding: 0.1,
    details: [
      { id: 'experience', label: 'Bisherige Erfahrungsnote Allgemeinbildung', shortLabel: 'Erfahrung', weight: 33.3333, roundingNote: 'auf ganze oder halbe Note gerundet' },
      { id: 'work', label: 'Neue Vertiefungs-/Schlussarbeit', shortLabel: 'VA/SA', weight: 33.3333, roundingNote: 'auf ganze oder halbe Note gerundet' },
      { id: 'exam', label: 'Neue ABU-Schlussprüfung', shortLabel: 'Prüfung', weight: 33.3333, roundingNote: 'auf ganze oder halbe Note gerundet' },
    ],
  },
  {
    id: 'dispensed',
    label: 'ABU dispensiert',
    description: 'Allgemeinbildung zählt in diesem Modus nicht zur Gesamtnote.',
    excluded: true,
  },
];

const informatikerSources = [
  { label: 'ICT-Berufsbildung', href: 'https://www.ict-berufsbildung.ch/grundbildung/ict-lehren/informatiker-in-efz' },
  { label: 'SBFI BiVo Art. 19', href: 'https://www.fedlex.admin.ch/eli/cc/2020/886/de#art_19' },
  { label: 'QV Ausführungsbestimmungen', href: 'https://www.ict-berufsbildung.ch/resources/Informatiker-EFZ_Ausfuehrungsbestimmungen_QV_202406121.pdf' },
  { label: 'ICT-BZ QV 2026', href: 'https://ict-bz.ch/download/qv-2026-prasentation-infoveranstaltung-applikation-und-plattformentwicklung' },
  { label: 'BBZBL BiVo 2021', href: 'https://www.bbzbl.ch/wp-content/uploads/2021/07/Qualifikationsverfahren-QV-BiVo-2021.pdf' },
  ...abuSources,
];

const informatikerOverview = [
  {
    title: 'Bestehen',
    text: 'Bestanden ist das QV nur mit IPA mindestens 4.0, IK mindestens 4.0 und Gesamtnote mindestens 4.0.',
  },
  {
    title: 'Gewichtung',
    text: 'Regulär: IPA 40%, IK 30%, ABU 20%, eGK 10%. Mit BM zählen nur IPA und IK.',
  },
  {
    title: 'Rundung',
    text: 'Gesamtnote, IPA, IK und ABU auf 0.1; eGK ist das auf ganze oder halbe Note gerundete Mittel aus acht Semesterzeugnisnoten.',
  },
  {
    title: 'IPA aktuell',
    text: 'Aktuell nach nationalen QV-Ausführungsbestimmungen: Ausführung 50%, Dokumentation 20%, Präsentation/Fachgespräch 30%.',
  },
];

const genericOverview = [
  {
    title: 'Bestehen',
    text: 'Die Gesamtnote muss mindestens 4.0 betragen. Als Fallnoten markierte Bereiche müssen zusätzlich mindestens 4.0 sein.',
  },
  {
    title: 'Gewichtung',
    text: 'Die Bestandteile werden mit den in der Bildungsverordnung festgelegten Prozentwerten gewichtet.',
  },
  {
    title: 'Rundung',
    text: 'Die Gesamtnote wird auf eine Dezimalstelle gerundet. Teilnoten sollen gemäss offiziellen Vorgaben bereits gerundet eingegeben werden.',
  },
  {
    title: 'Orientierung',
    text: 'Der Rechner bildet die reguläre EFZ-Variante ab und ersetzt keinen offiziellen Notenentscheid.',
  },
];

const informatikerComponents: QVComponent[] = [
  {
    id: 'ipa',
    label: 'Praktische Arbeit als IPA',
    shortLabel: 'IPA',
    weight: 40,
    description: 'Ausführung und Resultat inklusive Projektmanagement 50%, Dokumentation 20%, Präsentation und Fachgespräch 30%. Dieser Bereich ist eine Fallnote.',
    roundingNote: 'Positionsnoten auf 0.5; IPA-Note auf 0.1',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'execution', label: 'Ausführung und Resultat der Arbeit inkl. Projektmanagement', shortLabel: 'Ausführung', weight: 50, roundingNote: 'auf 0.5 gerundet' },
      { id: 'documentation', label: 'Dokumentation', shortLabel: 'Dokumentation', weight: 20, roundingNote: 'auf 0.5 gerundet' },
      { id: 'presentation', label: 'Präsentation und Fachgespräch', shortLabel: 'Präsentation', weight: 30, roundingNote: 'auf 0.5 gerundet' },
    ],
  },
  {
    id: 'abu',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 20,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'egk',
    label: 'Erweiterte Grundkompetenzen',
    shortLabel: 'eGK',
    weight: 10,
    description: 'Erfahrungsnote aus dem Unterrichtsbereich erweiterte Grundkompetenzen. Für Informatiker/in EFZ BiVo 2021 umfasst dieser Bereich Mathematik und Englisch; bei anderen oder älteren Bildungsverordnungen können andere Fächer gelten.',
    roundingNote: 'Mittel aus acht Semesterzeugnisnoten, auf ganze oder halbe Note gerundet',
    detailResultRounding: 0.5,
    details: [
      { id: 'semester-1', label: 'eGK Semesterzeugnisnote 1', shortLabel: 'S1', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-2', label: 'eGK Semesterzeugnisnote 2', shortLabel: 'S2', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-3', label: 'eGK Semesterzeugnisnote 3', shortLabel: 'S3', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-4', label: 'eGK Semesterzeugnisnote 4', shortLabel: 'S4', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-5', label: 'eGK Semesterzeugnisnote 5', shortLabel: 'S5', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-6', label: 'eGK Semesterzeugnisnote 6', shortLabel: 'S6', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-7', label: 'eGK Semesterzeugnisnote 7', shortLabel: 'S7', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
      { id: 'semester-8', label: 'eGK Semesterzeugnisnote 8', shortLabel: 'S8', weight: 12.5, roundingNote: 'ganze oder halbe Note' },
    ],
  },
  {
    id: 'ik',
    label: 'Erfahrungsnote Informatikkompetenzen',
    shortLabel: 'IK',
    weight: 30,
    description: 'Module der Berufsfachschule 80% und überbetriebliche Kurse 20%. Dieser Bereich ist eine Fallnote.',
    roundingNote: 'BFS/ÜK-Mittel auf 0.5; IK-Note auf 0.1',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'bfs', label: 'Module Berufsfachschule', shortLabel: 'BFS', weight: 80, roundingNote: 'Mittel auf 0.5 gerundet' },
      { id: 'uek', label: 'Überbetriebliche Kurse', shortLabel: 'ÜK', weight: 20, roundingNote: 'Mittel auf 0.5 gerundet' },
    ],
  },
];

const kaufmannComponents: QVComponent[] = [
  {
    id: 'kv-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 30,
    description: 'Betriebliche Abschlussprüfung in der Ausbildungs- und Prüfungsbranche. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
  },
  {
    id: 'kv-berufskenntnisse-allgemeinbildung',
    label: 'Berufskenntnisse und Allgemeinbildung',
    shortLabel: 'BK/AB',
    weight: 30,
    description: 'Schulische Abschlussprüfung über fünf Handlungskompetenzbereiche. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'hkb-a', label: 'HKB A: Handeln in agilen Arbeits- und Organisationsformen', shortLabel: 'HKB A', weight: 20 },
      { id: 'hkb-b', label: 'HKB B: Interagieren in einem vernetzten Arbeitsumfeld', shortLabel: 'HKB B', weight: 20 },
      { id: 'hkb-c', label: 'HKB C: Koordinieren von unternehmerischen Arbeitsprozessen', shortLabel: 'HKB C', weight: 20 },
      { id: 'hkb-d', label: 'HKB D: Gestalten von Kunden- oder Lieferantenbeziehungen', shortLabel: 'HKB D', weight: 20 },
      { id: 'hkb-e', label: 'HKB E: Einsetzen von Technologien der digitalen Arbeitswelt', shortLabel: 'HKB E', weight: 20 },
    ],
  },
  {
    id: 'kv-erfahrungsnote',
    label: 'Erfahrungsnote',
    shortLabel: 'Erfahrung',
    weight: 40,
    description: 'Gewichtetes Mittel aus Betrieb 25%, Berufsfachschule 50% und überbetrieblichen Kursen 25%.',
    roundingNote: 'Erfahrungsnote auf 0.1',
    details: [
      { id: 'betrieb', label: 'Bildung in beruflicher Praxis', shortLabel: 'Betrieb', weight: 25, roundingNote: 'auf 0.5 gerundet' },
      { id: 'berufsfachschule', label: 'Berufsfachschule', shortLabel: 'BFS', weight: 50, roundingNote: 'auf 0.5 gerundet' },
      { id: 'uek', label: 'Überbetriebliche Kurse', shortLabel: 'ÜK', weight: 25, roundingNote: 'auf 0.5 gerundet' },
    ],
  },
];

const detailhandelComponents: QVComponent[] = [
  {
    id: 'detailhandel-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 30,
    description: 'Praktische Arbeit im Detailhandel. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
  },
  {
    id: 'detailhandel-berufskenntnisse',
    label: 'Berufskenntnisse',
    shortLabel: 'BK',
    weight: 30,
    description: 'Berufskundlicher Qualifikationsbereich gemäss Schwerpunkt und Branche.',
  },
  {
    id: 'detailhandel-allgemeinbildung',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 10,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'detailhandel-erfahrungsnote',
    label: 'Erfahrungsnote',
    shortLabel: 'Erfahrung',
    weight: 30,
    description: 'Gewichtetes Mittel aus beruflicher Praxis 25%, Berufskenntnisse-Unterricht 50% und überbetrieblichen Kursen 25%.',
    roundingNote: 'Erfahrungsnote auf 0.1',
    details: [
      { id: 'betrieb', label: 'Bildung in beruflicher Praxis', shortLabel: 'Betrieb', weight: 25, roundingNote: 'auf 0.5 gerundet' },
      { id: 'berufskenntnisse', label: 'Unterricht in den Berufskenntnissen', shortLabel: 'BFS', weight: 50, roundingNote: 'auf 0.5 gerundet' },
      { id: 'uek', label: 'Überbetriebliche Kurse', shortLabel: 'ÜK', weight: 25, roundingNote: 'auf 0.5 gerundet' },
    ],
  },
];

const fabeComponents: QVComponent[] = [
  {
    id: 'fabe-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 40,
    description: 'Praktische Arbeit in der gewählten Fachrichtung. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
  },
  {
    id: 'fabe-berufskenntnisse',
    label: 'Berufskenntnisse',
    shortLabel: 'BK',
    weight: 20,
    description: 'Schriftliche Prüfung Berufskenntnisse mit allgemeinem und fachrichtungsspezifischem Teil.',
    details: [
      { id: 'allgemein', label: 'Transversale Kompetenzen, Alltag, Autonomie/Partizipation, Organisation/Team', shortLabel: 'Allgemein', weight: 70 },
      { id: 'spezifisch', label: 'Spezifische Begleitsituationen und fachrichtungsspezifische Kompetenzen', shortLabel: 'Spezifisch', weight: 30 },
    ],
  },
  {
    id: 'fabe-allgemeinbildung',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 20,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'fabe-erfahrungsnote',
    label: 'Erfahrungsnote',
    shortLabel: 'Erfahrung',
    weight: 20,
    description: 'Mittel aus den sechs Semesterzeugnisnoten für den Unterricht in den Berufskenntnissen.',
    roundingNote: 'auf ganze oder halbe Note gerundet',
  },
];

const mpaComponents: QVComponent[] = [
  {
    id: 'mpa-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 30,
    description: 'Vorgegebene praktische Arbeit. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'organisation-assistenz', label: 'Organisation/Administration und Assistenz in der Sprechstunde', shortLabel: 'Org/Assistenz', weight: 15 },
      { id: 'labor', label: 'Laboranalysen und Laborparameter', shortLabel: 'Labor', weight: 30 },
      { id: 'bildgebung', label: 'Bildgebende Diagnostik und Bildqualität', shortLabel: 'Bildgebung', weight: 40 },
      { id: 'therapie', label: 'Therapeutische Prozesse', shortLabel: 'Therapie', weight: 15 },
    ],
  },
  {
    id: 'mpa-berufskenntnisse',
    label: 'Berufskenntnisse',
    shortLabel: 'BK',
    weight: 30,
    description: 'Schriftliche Prüfung Berufskenntnisse. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'organisation', label: 'Organisation und Administration der medizinischen Praxis', shortLabel: 'Organisation', weight: 20 },
      { id: 'assistenz', label: 'Assistenz in der Sprechstunde und diagnostische Massnahmen', shortLabel: 'Assistenz', weight: 15 },
      { id: 'labor', label: 'Laboruntersuchungen und Laborparameter', shortLabel: 'Labor', weight: 20 },
      { id: 'bildgebung', label: 'Bildgebende Diagnostik und Bildqualität', shortLabel: 'Bildgebung', weight: 30 },
      { id: 'therapie', label: 'Therapeutische Prozesse', shortLabel: 'Therapie', weight: 15 },
    ],
  },
  {
    id: 'mpa-allgemeinbildung',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 20,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'mpa-erfahrungsnote',
    label: 'Erfahrungsnote Berufskenntnisse-Unterricht',
    shortLabel: 'Erfahrung',
    weight: 20,
    description: 'Mittel aus den sechs Semesterzeugnisnoten für den Unterricht in den Berufskenntnissen.',
    roundingNote: 'auf ganze oder halbe Note gerundet',
  },
];

const fageComponents: QVComponent[] = [
  {
    id: 'fage-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 30,
    description: 'Praktische Arbeit im Gesundheitsbereich. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
  },
  {
    id: 'fage-berufskenntnisse',
    label: 'Berufskenntnisse',
    shortLabel: 'BK',
    weight: 30,
    description: 'Qualifikationsbereich Berufskenntnisse.',
  },
  {
    id: 'fage-allgemeinbildung',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 20,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'fage-erfahrungsnote',
    label: 'Erfahrungsnote',
    shortLabel: 'Erfahrung',
    weight: 20,
    description: 'Gewichtetes Mittel aus Bildung in beruflicher Praxis 50% und Unterricht in den Berufskenntnissen 50%.',
    roundingNote: 'Erfahrungsnote auf 0.1',
    details: [
      { id: 'praxis', label: 'Bildung in beruflicher Praxis', shortLabel: 'Praxis', weight: 50, roundingNote: 'auf 0.5 gerundet' },
      { id: 'berufskenntnisse', label: 'Unterricht in den Berufskenntnissen', shortLabel: 'BFS', weight: 50, roundingNote: 'auf 0.5 gerundet' },
    ],
  },
];

const apothekeComponents: QVComponent[] = [
  {
    id: 'apotheke-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 40,
    description: 'Vorgegebene praktische Arbeit in der Apotheke. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'beraten-bedienen', label: 'Beraten und Bedienen der Kundinnen und Kunden', shortLabel: 'Beraten', weight: 30 },
      { id: 'abgeben-admin', label: 'Medikamente/Gesundheitsartikel abgeben und administrative Aufgaben', shortLabel: 'Abgabe/Admin', weight: 20 },
      { id: 'medizinische-abklaerungen', label: 'Medizinische Abklärungen und Handlungen', shortLabel: 'Abklärung', weight: 20 },
      { id: 'fachgespraech', label: 'Fachgespräch', shortLabel: 'Fachgespräch', weight: 30 },
    ],
  },
  {
    id: 'apotheke-berufskenntnisse',
    label: 'Berufskenntnisse',
    shortLabel: 'BK',
    weight: 20,
    description: 'Schriftliche Prüfung Berufskenntnisse. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
    details: [
      { id: 'versorgung', label: 'Beratung, Abgabe und medizinische Versorgung', shortLabel: 'Versorgung', weight: 80 },
      { id: 'bewirtschaftung-admin', label: 'Bewirtschaftung und administrative Aufgaben', shortLabel: 'Waren/Admin', weight: 20 },
    ],
  },
  {
    id: 'apotheke-allgemeinbildung',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 20,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'apotheke-erfahrungsnote',
    label: 'Erfahrungsnote',
    shortLabel: 'Erfahrung',
    weight: 20,
    description: 'Gewichtetes Mittel aus Berufskenntnisse-Unterricht 70% und überbetrieblichen Kursen 30%.',
    roundingNote: 'Erfahrungsnote auf 0.1',
    details: [
      { id: 'berufskenntnisse', label: 'Unterricht in den Berufskenntnissen', shortLabel: 'BFS', weight: 70, roundingNote: 'auf 0.5 gerundet' },
      { id: 'uek', label: 'Überbetriebliche Kurse', shortLabel: 'ÜK', weight: 30, roundingNote: 'auf 0.5 gerundet' },
    ],
  },
];

const logistikComponents: QVComponent[] = [
  {
    id: 'logistik-praktische-arbeit',
    label: 'Praktische Arbeit',
    shortLabel: 'Praxis',
    weight: 40,
    description: 'Praktische Arbeit in der gewählten Fachrichtung. Dieser Bereich ist eine Fallnote.',
    fallnote: true,
    minGrade: 4,
  },
  {
    id: 'logistik-berufskenntnisse',
    label: 'Berufskenntnisse',
    shortLabel: 'BK',
    weight: 20,
    description: 'Qualifikationsbereich Berufskenntnisse.',
  },
  {
    id: 'logistik-allgemeinbildung',
    label: 'Allgemeinbildung',
    shortLabel: 'ABU',
    weight: 20,
    description: abuDescription,
    roundingNote: abuRoundingNote,
    defaultDetailModeId: 'efz-standard',
    detailModes: abuEfzDetailModes,
  },
  {
    id: 'logistik-erfahrungsnote',
    label: 'Erfahrungsnote',
    shortLabel: 'Erfahrung',
    weight: 20,
    description: 'Gewichtetes Mittel aus beruflicher Praxis 25%, Berufskenntnisse-Unterricht 50% und überbetrieblichen Kursen 25%.',
    roundingNote: 'Erfahrungsnote auf 0.1',
    details: [
      { id: 'praxis', label: 'Bildung in beruflicher Praxis', shortLabel: 'Praxis', weight: 25, roundingNote: 'auf 0.5 gerundet' },
      { id: 'berufskenntnisse', label: 'Unterricht in den Berufskenntnissen', shortLabel: 'BFS', weight: 50, roundingNote: 'auf 0.5 gerundet' },
      { id: 'uek', label: 'Überbetriebliche Kurse', shortLabel: 'ÜK', weight: 25, roundingNote: 'auf 0.5 gerundet' },
    ],
  },
];

export const QV_PRESETS: QVPreset[] = [
  {
    id: 'informatiker-efz-applikationsentwicklung',
    label: 'EFZ Informatiker/in Applikationsentwicklung',
    shortLabel: 'Informatiker/in Applikation',
    fachrichtung: 'Applikationsentwicklung',
    description: 'QV Informatiker/in EFZ nach BiVo 2021 mit IPA, Informatikkompetenzen, ABU, erweiterten Grundkompetenzen und BM-Sonderfall.',
    overviewItems: informatikerOverview,
    sources: informatikerSources,
    tracks: informatikerTracks,
    components: informatikerComponents,
  },
  {
    id: 'informatiker-efz-plattformentwicklung',
    label: 'EFZ Informatiker/in Plattformentwicklung',
    shortLabel: 'Informatiker/in Plattform',
    fachrichtung: 'Plattformentwicklung',
    description: 'QV Informatiker/in EFZ nach BiVo 2021 mit IPA, Informatikkompetenzen, ABU, erweiterten Grundkompetenzen und BM-Sonderfall.',
    overviewItems: informatikerOverview,
    sources: informatikerSources,
    tracks: informatikerTracks,
    components: informatikerComponents,
  },
  {
    id: 'kaufmann-kauffrau-efz',
    label: 'EFZ Kauffrau/Kaufmann',
    shortLabel: 'Kauffrau/Kaufmann',
    fachrichtung: 'Kaufmännische Grundbildung',
    description: 'QV Kauffrau/Kaufmann EFZ mit praktischer Arbeit, Berufskenntnissen/Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'WKS QV Kaufleute EFZ', href: 'https://weiter-lernen.ch/anleitungen/noten-und-qualifikationsverfahren-kaufleute-efz' },
      { label: 'VZGV BiVo 2023 Kaufleute', href: 'https://www.vzgv.ch/berufsbildung/bivo-2023-kaufleute-2023' },
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: kaufmannComponents,
  },
  {
    id: 'detailhandelsfachmann-detailhandelsfachfrau-efz',
    label: 'EFZ Detailhandelsfachfrau/-mann',
    shortLabel: 'Detailhandel',
    fachrichtung: 'Detailhandel',
    description: 'QV Detailhandelsfachfrau/-mann EFZ mit praktischer Arbeit, Berufskenntnissen, Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'BiVo Detailhandel Art. 21', href: 'https://www.droit-bilingue.ch/de-fr/4/41/412.101.220.03-21-24.html' },
      ...abuSources,
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: detailhandelComponents,
  },
  {
    id: 'fachmann-fachfrau-betreuung-efz',
    label: 'EFZ Fachfrau/-mann Betreuung',
    shortLabel: 'FaBe',
    fachrichtung: 'Betreuung',
    description: 'QV Fachfrau/-mann Betreuung EFZ mit praktischer Arbeit, Berufskenntnissen, Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'BiVo FaBe Art. 18', href: 'https://www.droit-bilingue.ch/fr-de/4/41/412.101.220.14-18-21.html' },
      ...abuSources,
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: fabeComponents,
  },
  {
    id: 'medizinische-praxisassistentin-praxisassistent-efz',
    label: 'EFZ Medizinische/r Praxisassistent/in',
    shortLabel: 'MPA',
    fachrichtung: 'Medizinische Praxisassistenz',
    description: 'QV Medizinische/r Praxisassistent/in EFZ mit praktischer Arbeit, Berufskenntnissen, Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'BiVo MPA Art. 19', href: 'https://www.droit-bilingue.ch/de-fr/4/41/412.101.221.07-19-22.html' },
      ...abuSources,
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: mpaComponents,
  },
  {
    id: 'fachmann-fachfrau-gesundheit-efz',
    label: 'EFZ Fachfrau/-mann Gesundheit',
    shortLabel: 'FaGe',
    fachrichtung: 'Gesundheit',
    description: 'QV Fachfrau/-mann Gesundheit EFZ mit praktischer Arbeit, Berufskenntnissen, Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'BiVo FaGe Art. 19', href: 'https://www.droit-bilingue.ch/de-fr/4/41/412.101.220.96-19-22.html' },
      ...abuSources,
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: fageComponents,
  },
  {
    id: 'fachmann-fachfrau-apotheke-efz',
    label: 'EFZ Fachfrau/-mann Apotheke',
    shortLabel: 'Apotheke',
    fachrichtung: 'Apotheke',
    description: 'QV Fachfrau/-mann Apotheke EFZ mit praktischer Arbeit, Berufskenntnissen, Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'BiVo Apotheke Art. 19', href: 'https://www.droit-bilingue.ch/de-fr/4/41/412.101.220.40-19-22.html' },
      ...abuSources,
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: apothekeComponents,
  },
  {
    id: 'logistiker-logistikerin-efz',
    label: 'EFZ Logistiker/in',
    shortLabel: 'Logistik',
    fachrichtung: 'Logistik',
    description: 'QV Logistiker/in EFZ mit praktischer Arbeit, Berufskenntnissen, Allgemeinbildung und Erfahrungsnote.',
    overviewItems: genericOverview,
    sources: [
      { label: 'BiVo Logistik Art. 20', href: 'https://www.droit-bilingue.ch/de-fr/4/41/412.101.220.31-20-23.html' },
      ...abuSources,
      ...popularitySources,
    ],
    tracks: defaultTracks,
    components: logistikComponents,
  },
];

export function getQVPreset(id: string): QVPreset {
  return QV_PRESETS.find((preset) => preset.id === id) ?? QV_PRESETS[0];
}

export function getQVTrack(preset: QVPreset, trackId: string): QVTrackOption {
  return preset.tracks.find((track) => track.id === trackId) ?? preset.tracks[0];
}
