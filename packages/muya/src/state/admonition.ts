export const ADMONITION_TYPES = [
    'note',
    'tip',
    'caution',
    'warning',
    'important',
] as const;

export type TAdmonitionType = typeof ADMONITION_TYPES[number];

const ADMONITION_MARKERS: Record<TAdmonitionType, string> = {
    note: 'NOTE',
    tip: 'TIP',
    caution: 'CAUTION',
    warning: 'WARNING',
    important: 'IMPORTANT',
};

const ADMONITION_TITLES: Record<TAdmonitionType, string> = {
    note: 'Note',
    tip: 'Tip',
    caution: 'Caution',
    warning: 'Warning',
    important: 'Important',
};

const MARKER_RE = /^\s*\[!([A-Z]+)\]\s*$/;

export function isAdmonitionType(value: string): value is TAdmonitionType {
    return (ADMONITION_TYPES as readonly string[]).includes(value);
}

export function admonitionMarker(type: TAdmonitionType) {
    return `[!${ADMONITION_MARKERS[type]}]`;
}

export function admonitionTitle(type: TAdmonitionType) {
    return ADMONITION_TITLES[type];
}

export function parseAdmonitionMarker(text: string): {
    admonitionType: TAdmonitionType;
} | null {
    const match = MARKER_RE.exec(text);
    if (!match)
        return null;

    const admonitionType = match[1].toLowerCase();
    if (!isAdmonitionType(admonitionType))
        return null;

    return {
        admonitionType,
    };
}
