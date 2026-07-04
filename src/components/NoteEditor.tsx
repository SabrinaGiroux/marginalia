import { useEffect, useRef } from 'react';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function NoteEditor({ value, onChange }: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<EasyMDE | null>(null);

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

    return () => editor.toTextArea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <textarea ref={textareaRef} />;
}