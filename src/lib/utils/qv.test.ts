import { describe, expect, test } from 'bun:test';
import { QV_PRESETS } from '../qv/presets';
import {
  computeComponentGrade,
  computeNeededGrade,
  computeQVFinalGrade,
  evaluateQV,
} from './qv';
import type { QVComponent, QVPreset } from '../qv/types';

const preset = QV_PRESETS[0];
const ipa = preset.components.find((component) => component.id === 'ipa')!;
const abu = preset.components.find((component) => component.id === 'abu')!;
const egk = preset.components.find((component) => component.id === 'egk')!;
const ik = preset.components.find((component) => component.id === 'ik')!;

const popularPresetIds = [
  'kaufmann-kauffrau-efz',
  'detailhandelsfachmann-detailhandelsfachfrau-efz',
  'fachmann-fachfrau-betreuung-efz',
  'medizinische-praxisassistentin-praxisassistent-efz',
  'fachmann-fachfrau-gesundheit-efz',
  'fachmann-fachfrau-apotheke-efz',
  'logistiker-logistikerin-efz',
];

function presetById(id: string): QVPreset {
  const found = QV_PRESETS.find((entry) => entry.id === id);
  if (!found) throw new Error(`Missing QV preset ${id}`);
  return found;
}

function componentById(preset: QVPreset, id: string): QVComponent {
  const found = preset.components.find((component) => component.id === id);
  if (!found) throw new Error(`Missing QV component ${id}`);
  return found;
}

function gradesFor(preset: QVPreset, value: number): Record<string, number> {
  return Object.fromEntries(preset.components.map((component) => [component.id, value]));
}

describe('QV Informatiker/in EFZ calculations', () => {
  test('regular all 4.0 passes', () => {
    const result = evaluateQV(preset, 'regular', { ipa: 4, abu: 4, egk: 4, ik: 4 });
    expect(result.finalGrade).toBe(4);
    expect(result.passed).toBe(true);
  });

  test('regular IPA below 4.0 fails even with a high final grade', () => {
    const result = evaluateQV(preset, 'regular', { ipa: 3.9, abu: 6, egk: 6, ik: 6 });
    expect(result.finalGrade).toBeGreaterThanOrEqual(4);
    expect(result.failedFallnoten).toEqual(['ipa']);
    expect(result.passed).toBe(false);
  });

  test('regular IK below 4.0 fails even with a high final grade', () => {
    const result = evaluateQV(preset, 'regular', { ipa: 6, abu: 6, egk: 6, ik: 3.9 });
    expect(result.finalGrade).toBeGreaterThanOrEqual(4);
    expect(result.failedFallnoten).toEqual(['ik']);
    expect(result.passed).toBe(false);
  });

  test('regular raw 3.95 rounds to 4.0 and passes when fallnoten pass', () => {
    const result = evaluateQV(preset, 'regular', { ipa: 4, abu: 4, egk: 3.5, ik: 4 });
    expect(result.rawFinalGrade).toBeCloseTo(3.95);
    expect(result.finalGrade).toBe(4);
    expect(result.passed).toBe(true);
  });

  test('BM mode normalizes IPA 40 and IK 30 over 70', () => {
    const result = computeQVFinalGrade(preset, 'bm', { ipa: 5, ik: 4 });
    expect(result?.rawFinalGrade).toBeCloseTo((5 * 40 + 4 * 30) / 70);
    expect(result?.finalGrade).toBe(4.6);
  });

  test('BM mode with IPA 4.0 and IK 4.0 passes', () => {
    const result = evaluateQV(preset, 'bm', { ipa: 4, ik: 4 });
    expect(result.finalGrade).toBe(4);
    expect(result.passed).toBe(true);
  });

  test('BM mode with a fallnote below 4.0 fails', () => {
    const result = evaluateQV(preset, 'bm', { ipa: 3.9, ik: 6 });
    expect(result.failedFallnoten).toEqual(['ipa']);
    expect(result.passed).toBe(false);
  });

  test('IPA detail calculation uses 50/20/30', () => {
    const result = computeComponentGrade(ipa, {
      execution: 5,
      documentation: 4,
      presentation: 3,
    });
    expect(result).toBe(4.2);
  });

  test('IK detail calculation uses 80/20', () => {
    const result = computeComponentGrade(ik, { bfs: 4.5, uek: 5.5 });
    expect(result).toBe(4.7);
  });

  test('eGK exposes eight equally weighted semester detail fields', () => {
    expect(egk.details?.length).toBe(8);
    expect(egk.details?.every((detail) => detail.weight === 12.5)).toBe(true);
  });

  test('eGK detail calculation averages eight semester notes and rounds to 0.5', () => {
    const result = computeComponentGrade(egk, {
      'semester-1': 4,
      'semester-2': 4,
      'semester-3': 4,
      'semester-4': 4,
      'semester-5': 4.5,
      'semester-6': 4.5,
      'semester-7': 4.5,
      'semester-8': 4.5,
    });
    expect(result).toBe(4.5);
  });

  test('eGK detail calculation waits for all eight semester notes', () => {
    const result = computeComponentGrade(egk, {
      'semester-1': 4,
      'semester-2': 4,
      'semester-3': 4,
      'semester-4': 4,
      'semester-5': 4.5,
      'semester-6': 4.5,
      'semester-7': 4.5,
    });
    expect(result).toBeNull();
  });

  test('direct eGK grade entry still works in regular final calculation', () => {
    const result = evaluateQV(preset, 'regular', { ipa: 4, abu: 4, egk: 4.5, ik: 4 });
    expect(result.finalGrade).toBe(4.1);
    expect(result.passed).toBe(true);
  });

  test('ABU standard mode uses experience, work and exam in equal thirds', () => {
    const result = computeComponentGrade(abu, {
      experience: 4,
      work: 5,
      exam: 6,
    }, 'efz-standard');
    expect(result).toBe(5);
  });

  test('ABU standard mode rounds the component grade to 0.1', () => {
    const result = computeComponentGrade(abu, {
      experience: 4,
      work: 4,
      exam: 5,
    }, 'efz-standard');
    expect(result).toBe(4.3);
  });

  test('ABU BM transfer mode uses work and exam at 50/50', () => {
    const result = computeComponentGrade(abu, {
      work: 4,
      exam: 6,
    }, 'bm-transfer-late');
    expect(result).toBe(5);
  });

  test('ABU outside regular education mode uses work and exam at 50/50', () => {
    const result = computeComponentGrade(abu, {
      work: 3,
      exam: 5,
    }, 'outside-regular-education');
    expect(result).toBe(4);
  });

  test('ABU repeat without ABU school mode uses previous experience, new work and new exam', () => {
    const result = computeComponentGrade(abu, {
      experience: 4,
      work: 5,
      exam: 6,
    }, 'repeat-without-abu-school');
    expect(result).toBe(5);
  });

  test('ABU dispensed mode removes ABU from missing components and active weight', () => {
    const result = evaluateQV(preset, 'regular', { ipa: 4, egk: 4, ik: 4 }, { abu: 'dispensed' });
    expect(result.activeWeightSum).toBe(80);
    expect(result.missingComponentIds).toEqual([]);
    expect(result.finalGrade).toBe(4);
    expect(result.passed).toBe(true);

    const needed = computeNeededGrade(preset, 'regular', { ipa: 4, egk: 4, ik: 4 }, { abu: 'dispensed' });
    expect(needed).toBeNull();
  });

  test('BM track still excludes ABU and eGK independently of ABU mode', () => {
    const result = evaluateQV(preset, 'bm', { ipa: 4, ik: 4 }, { abu: 'efz-standard' });
    expect(result.activeComponents.map((component) => component.id)).toEqual(['ipa', 'ik']);
    expect(result.activeWeightSum).toBe(70);
    expect(result.passed).toBe(true);
  });

  test('needed grade respects fallnoten', () => {
    const needed = computeNeededGrade(preset, 'regular', { abu: 6, egk: 6, ik: 6 });
    expect(needed?.missingComponentIds).toEqual(['ipa']);
    expect(needed?.grade).toBe(4);
    expect(needed?.impossible).toBe(false);
  });

  test('needed grade respects max grade 6.0', () => {
    const needed = computeNeededGrade(preset, 'regular', { ipa: 4, ik: 4, abu: 1 });
    expect(needed?.missingComponentIds).toEqual(['egk']);
    expect(needed?.grade).toBeNull();
    expect(needed?.impossible).toBe(true);
    expect(needed?.reason).toBe('max-grade');
  });
});

describe('QV popular EFZ preset calculations', () => {
  for (const presetId of popularPresetIds) {
    test(`${presetId} passes with all components at 4.0`, () => {
      const currentPreset = presetById(presetId);
      const result = evaluateQV(currentPreset, 'regular', gradesFor(currentPreset, 4));

      expect(result.finalGrade).toBe(4);
      expect(result.passed).toBe(true);
    });
  }

  test('fallnote failures fail even when the weighted total is high', () => {
    for (const presetId of popularPresetIds) {
      const currentPreset = presetById(presetId);

      for (const component of currentPreset.components.filter((entry) => entry.fallnote)) {
        const grades = gradesFor(currentPreset, 6);
        grades[component.id] = 3.9;
        const result = evaluateQV(currentPreset, 'regular', grades);

        expect(result.finalGrade).toBeGreaterThanOrEqual(4);
        expect(result.failedFallnoten.includes(component.id)).toBe(true);
        expect(result.passed).toBe(false);
      }
    }
  });

  const weightedExamples: [string, Record<string, number>, number][] = [
    [
      'kaufmann-kauffrau-efz',
      { 'kv-praktische-arbeit': 4, 'kv-berufskenntnisse-allgemeinbildung': 5, 'kv-erfahrungsnote': 6 },
      5.1,
    ],
    [
      'detailhandelsfachmann-detailhandelsfachfrau-efz',
      {
        'detailhandel-praktische-arbeit': 4,
        'detailhandel-berufskenntnisse': 5,
        'detailhandel-allgemeinbildung': 6,
        'detailhandel-erfahrungsnote': 5,
      },
      4.8,
    ],
    [
      'fachmann-fachfrau-betreuung-efz',
      { 'fabe-praktische-arbeit': 4, 'fabe-berufskenntnisse': 5, 'fabe-allgemeinbildung': 6, 'fabe-erfahrungsnote': 5 },
      4.8,
    ],
    [
      'medizinische-praxisassistentin-praxisassistent-efz',
      { 'mpa-praktische-arbeit': 4, 'mpa-berufskenntnisse': 5, 'mpa-allgemeinbildung': 6, 'mpa-erfahrungsnote': 5 },
      4.9,
    ],
    [
      'fachmann-fachfrau-gesundheit-efz',
      { 'fage-praktische-arbeit': 4, 'fage-berufskenntnisse': 5, 'fage-allgemeinbildung': 6, 'fage-erfahrungsnote': 5 },
      4.9,
    ],
    [
      'fachmann-fachfrau-apotheke-efz',
      { 'apotheke-praktische-arbeit': 4, 'apotheke-berufskenntnisse': 5, 'apotheke-allgemeinbildung': 6, 'apotheke-erfahrungsnote': 5 },
      4.8,
    ],
    [
      'logistiker-logistikerin-efz',
      { 'logistik-praktische-arbeit': 4, 'logistik-berufskenntnisse': 5, 'logistik-allgemeinbildung': 6, 'logistik-erfahrungsnote': 5 },
      4.8,
    ],
  ];

  for (const [presetId, grades, expectedFinalGrade] of weightedExamples) {
    test(`${presetId} weighted example rounds to the expected final grade`, () => {
      const result = computeQVFinalGrade(presetById(presetId), 'regular', grades);
      expect(result?.finalGrade).toBe(expectedFinalGrade);
    });
  }

  const detailExamples: [string, string, Record<string, number>, number][] = [
    ['kaufmann-kauffrau-efz', 'kv-erfahrungsnote', { betrieb: 4, berufsfachschule: 5, uek: 6 }, 5],
    [
      'detailhandelsfachmann-detailhandelsfachfrau-efz',
      'detailhandel-erfahrungsnote',
      { betrieb: 4, berufskenntnisse: 5, uek: 6 },
      5,
    ],
    [
      'fachmann-fachfrau-apotheke-efz',
      'apotheke-erfahrungsnote',
      { berufskenntnisse: 5, uek: 4 },
      4.7,
    ],
    [
      'medizinische-praxisassistentin-praxisassistent-efz',
      'mpa-berufskenntnisse',
      { organisation: 4, assistenz: 4, labor: 5, bildgebung: 6, therapie: 5 },
      5,
    ],
    [
      'fachmann-fachfrau-gesundheit-efz',
      'fage-erfahrungsnote',
      { praxis: 4.5, berufskenntnisse: 5.5 },
      5,
    ],
    [
      'logistiker-logistikerin-efz',
      'logistik-erfahrungsnote',
      { praxis: 4, berufskenntnisse: 5, uek: 6 },
      5,
    ],
  ];

  for (const [presetId, componentId, detailGrades, expectedGrade] of detailExamples) {
    test(`${presetId} ${componentId} detail weights calculate correctly`, () => {
      const component = componentById(presetById(presetId), componentId);
      expect(computeComponentGrade(component, detailGrades)).toBe(expectedGrade);
    });
  }
});
