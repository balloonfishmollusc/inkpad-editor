import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { basicDark } from "./theme";
import {StreamLanguage} from "@codemirror/stream-parser"
import {cInk} from "./mode/c-ink"
import {decode} from "utf8"
import {openSearchPanel, closeSearchPanel} from "@codemirror/basic-setup"
import {undo, redo} from "@codemirror/history"
import {EditorSelection} from "@codemirror/state"

let state = EditorState.create({ doc: "", extensions: [
        basicSetup,
        EditorView.lineWrapping,
        basicDark,
        StreamLanguage.define(cInk),
    ] });

window.view = new EditorView({ state, parent: document.querySelector("#editor") });
window.api = new Object();

window.api.getText = function() {
    return window.view.state.doc.toJSON().join("\n");
}

window.api.undo = function() {
  undo({state: window.view.state, dispatch: (t)=>window.view.dispatch(t)});
}

window.api.redo = function() {
  redo({state: window.view.state, dispatch: (t)=>window.view.dispatch(t)});
}

window.api.showSearch = function(visible) {
  if(visible) openSearchPanel(window.view);
  else closeSearchPanel(window.view);
}

window.api.insertText = function(string, b64=false, offset=0) {
  if(b64) string = decode(window.atob(string));
  let range = window.view.state.selection.main;
  window.view.dispatch(
      window.view.state.update(
        {
          changes: {
            from: range.from, to: range.to, insert: string,
          },
          selection: EditorSelection.single(range.from + offset),
        }
      )
  );
};

window.api.setCursor = function(pos) {
  window.view.dispatch(
    window.view.state.update(
      {
        selection: EditorSelection.single(pos)
      }
    )
  );
  window.view.scrollPosIntoView(pos);
};

window.api.setText = function(string, b64=true) {
  if(b64) string = decode(window.atob(string));
    window.view.dispatch(
        window.view.state.update(
          {
            changes: {
              from: 0, to: window.view.state.doc.length, insert: string,
            }
          }
        )
    );
};