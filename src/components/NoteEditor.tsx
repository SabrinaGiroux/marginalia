import { useEffect, useRef } from 'react';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export function NoteEditor({ value, onChange, onSave }: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<EasyMDE | null>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  useEffect(() => {
    if (!textareaRef.current) return;

    const editor = new EasyMDE({
      element: textareaRef.current,
      initialValue: value,
      spellChecker: false,
      sideBySideFullscreen: false,
      minHeight: '30vh',
    });

    editor.codemirror.on('change', () => onChange(editor.value()));
    editorRef.current = editor;

    // Intercept Ctrl/Cmd+S before the browser's native save dialog opens
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSaveShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's';
      if (isSaveShortcut && editor.codemirror.hasFocus()) {
        e.preventDefault();
        onSaveRef.current();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      editor.toTextArea();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <textarea ref={textareaRef} />;
}
