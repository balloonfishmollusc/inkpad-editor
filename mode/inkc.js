import {simpleMode} from "./simple-mode.js"

var commonAtoms = ["true", "false", "END", "DONE", "__newline__"];
var commonKeywords = ["->", "else", "function", "INCLUDE", "return", "VAR", "CONST", "CHOICE_COUNT", "TURNS_SINCE", "POW", "FLOOR", "CEILING", "INT", "FLOAT", "RANDOM", "SEED_RANDOM"];
var commonCommands = "array,range,get,set,push,pop,remove,contains,join,str,len,concat,sum,min,max,map,filter,slice,zeros,copy,free,dict,keys,values".split(",");
var tabletopCommands = ['_on_tap(i)', '_init()', '_draw()', '_get_canvas_size()', '_get_max_players()', 'sync', '__player__'];

export const Inkc = simpleMode({
  start: [
    {regex: /"/, token: "string", next: "string"},

    {regex: /->\s*[a-zA-Z]\w*(?:\.[a-zA-Z]\w*)?/, token: "keyword"},
    {regex: /\s*->{1,2}\s*$/, token: "keyword"},

    {regex: /^==\s[a-zA-Z]\w*(?:\s==)?/, token: "meta"},
    {regex: /^=\s[a-zA-Z]\w*/, token: "meta"},
    {regex: /\s*[\+\*\-]+\s/, token: "meta"},

    {regex: /\s*(\[.+?\])/, token: "annotation"},
    {regex: /^(?:\[.+?\])?VAR\s[^/\n]*/, token: "operator"},
    {regex: /\s*~\s[^\n]*/, token: "operator"},
    {regex: /{.+?}/, token: "operator"},

    {regex: /\/\/.*/, token: "comment"},
    
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true}
  ],
  string: [
    {regex: /"/, token: "string", next: "start"},
    {regex: /(?:[^\\"]|\\(?:.|$))*/, token: "string"}
  ],
  languageData: {
    autocomplete: commonAtoms.concat(commonKeywords, commonCommands, tabletopCommands),
    dontIndentStates: ["comment"],
    indentOnInput: /^\s*\}$/,
    commentTokens: {line: "//"}
  }
});