import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import {HighlightStyle, tags as t} from "@codemirror/highlight"

const base00 = 'rgb(13,17,23)',
  base01 = 'rgb(204,204,204)',
  base02 = '#234879',
  base03 = '#b0b0b0',
  base05 = '#808080',
  base06 = '#808080',
  base09 = '#fc6d24',
  base0A = 'rgb(79,193,255)',
  base0B = '#8abeb7',
  base0C = '#b5bd68',
  base0D = 'rgb(240,246,252)',
  base0E = 'rgb(197,134,192)',
  base0F = '#6987AF'

const invalid = base09,
  darkBackground = base00,   // line number bkg
  highlightBackground = base03 + "16",
  background = base00,
  tooltipBackground = "rgb(22,27,34)",
  selection = base02,
  cursor = base01

/// The editor theme styles for Basic Dark.
export const basicDarkTheme = EditorView.theme(
  {
    '&': {
      color: base01,
      backgroundColor: background
    },

    '.cm-content': {
      caretColor: cursor,
      "font-family": "SourceCodePro",
    },

    '.cm-gutter': {
      "font-family": "SourceCodePro",
    },

    '.cm-button': {
      background: base00,
    },

    '.cm-search, .cm-button, .cm-panel, .cm-textfield': {
      "font-family": "SourceCodePro",
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: selection },

    '.cm-panels': { backgroundColor: darkBackground, color: base03 },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-searchMatch': {
      backgroundColor: base02,
      outline: `1px solid ${base03}`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base05,
    },

    '.cm-activeLine': { backgroundColor: highlightBackground },
    '.cm-selectionMatch': { backgroundColor: highlightBackground },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      outline: `1px solid ${base03}`
    },

    '&.cm-focused .cm-matchingBracket': {
      backgroundColor: base02,
    },

    '.cm-gutters': {
      borderRight: `1px solid #ffffff10`,
      color: base06,
      backgroundColor: darkBackground
    },

    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: base02
    },

    '.cm-completionLabel': {
      "font-family": "SourceCodePro",
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: tooltipBackground,
      color: base01,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: selection,
        color: "ffffff"
      }
    }
  },
  { dark: true }
)

/// The highlighting style for code in the Basic Light theme.
export const basicDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base0A },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: base0C
  },
  { tag: [t.variableName], color: base0D },
  { tag: [t.function(t.variableName)], color: base0A },
  { tag: [t.labelName], color: base09 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0A
  },
  { tag: [t.definition(t.name), t.separator], color: base0E },
  { tag: [t.brace], color: base0E },
  {
    tag: [t.annotation],
    color: base06
  },
  {
    tag: [t.typeName, t.className],
    color: base0D
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: base0E
  },
  {
    tag: [t.tagName],
    color: base0A
  },
  {
    tag: [t.squareBracket],
    color: base0E
  },
  {
    tag: [t.angleBracket],
    color: base0E
  },
  {
    tag: [t.attributeName],
    color: base0D
  },
  {
    tag: [t.regexp],
    color: base0A
  },
  {
    tag: [t.quote],
    color: base01
  },
  { tag: [t.string], color: base0C },
  {
    tag: t.link,
    color: base0F,
    textDecoration: 'underline',
    textUnderlinePosition: 'under'
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: base0B
  },
  { tag: [t.meta], color: "rgb(220, 220, 170)" },
  { tag: [t.comment], color: "rgb(106, 153, 85)", fontStyle: 'italic' },
  { tag: t.strong, fontWeight: 'bold', color: base0A },
  { tag: t.emphasis, fontStyle: 'italic', color: base0D },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0B },
  {
    tag: [t.processingInstruction, t.inserted],
    color: base0B
  },
  {
    tag: [t.contentSeparator],
    color: base0D
  },
  { tag: t.invalid, color: base02, borderBottom: `1px dotted ${invalid}` }
])

/// Extension to enable the Basic Dark theme (both the editor theme and
/// the highlight style).
export const basicDark: Extension = [basicDarkTheme, basicDarkHighlightStyle]