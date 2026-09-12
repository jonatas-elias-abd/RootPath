import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  StickyNote,
  Plus,
  Trash2,
  Save,
  Tag,
  Clock,
  Sparkles,
  FileText,
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  updatedAt: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: 'n-1',
    title: 'Comandos que sempre esqueço',
    category: 'Comandos Úteis',
    content: '- `ls -la`: Lista todos os arquivos incluindo os ocultos que começam com ponto.\n- `tar -czvf arquivo.tar.gz pasta/`: Compacta uma pasta inteira.\n- `chmod 755`: Permissão total pro dono, leitura e execução pros outros.',
    updatedAt: 'Hoje às 22:30',
  },
  {
    id: 'n-2',
    title: 'Estrutura do Kali & Pastas Importantes',
    category: 'Arquitetura',
    content: '- `/etc/shadow`: Onde ficam os hashes das senhas (só root lê).\n- `/var/log/`: Logs de acessos e incidentes do sistema.\n- `/tmp/`: Pasta volátil, limpa a cada reboot.',
    updatedAt: 'Hoje às 23:10',
  },
];

export const NotesView: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string>(INITIAL_NOTES[0].id);
  const [activeTitle, setActiveTitle] = useState(INITIAL_NOTES[0].title);
  const [activeContent, setActiveContent] = useState(INITIAL_NOTES[0].content);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const activeNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const handleSelect = (note: Note) => {
    setSelectedNoteId(note.id);
    setActiveTitle(note.title);
    setActiveContent(note.content);
    setSavedFeedback(false);
  };

  const handleCreateNew = () => {
    const newNote: Note = {
      id: `n-${Date.now()}`,
      title: 'Nova Anotação de Estudo',
      category: 'Geral',
      content: '',
      updatedAt: 'Agora mesmo',
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setActiveTitle(newNote.title);
    setActiveContent(newNote.content);
  };

  const handleSave = () => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedNoteId
          ? { ...n, title: activeTitle, content: activeContent, updatedAt: 'Agora mesmo' }
          : n
      )
    );
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleDelete = (id: string) => {
    if (notes.length <= 1) return;
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    handleSelect(remaining[0]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <StickyNote className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Central de Anotações do Aluno
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                Bloco Persistente
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Registre observações, comandos de campo e macetes enquanto estuda as lições e resolve chamados.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-primary-electric hover:bg-primary-electric/90 text-white font-display font-semibold rounded-xl text-xs flex items-center gap-2 shadow-glow-primary transition-all"
          >
            <Plus className="w-4 h-4" /> Nova Nota
          </button>
          <SiberianCatMascot size={52} mood="focused" />
        </div>
      </div>

      {/* Grid: Lista de Notas (Esquerda) + Editor de Markdown (Direita) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Coluna Esquerda */}
        <div className="col-span-4 flex flex-col gap-3">
          <span className="text-xs font-mono font-bold text-on-surface-variant px-1">
            SUAS NOTAS SALVAS ({notes.length})
          </span>

          {notes.map((note) => {
            const isSelected = note.id === selectedNoteId;
            return (
              <div
                key={note.id}
                onClick={() => handleSelect(note)}
                className={`
                  p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5
                  ${
                    isSelected
                      ? 'bg-surface-container-high border-primary-electric shadow-glow-primary'
                      : 'bg-layer1 border-outline-subtle hover:border-outline'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-on-surface truncate">
                    {note.title || 'Sem título'}
                  </h3>
                  <span className="text-[10px] font-mono text-primary-electric bg-primary-electric/10 px-2 py-0.5 rounded border border-primary-electric/20">
                    {note.category}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {note.content || '(Nota vazia)'}
                </p>
                <span className="text-[10px] font-mono text-on-surface-variant/70 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> {note.updatedAt}
                </span>
              </div>
            );
          })}
        </div>

        {/* Coluna Direita: Editor */}
        <div className="col-span-8 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex flex-col gap-4 shadow-surface-card">
            <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
              <input
                type="text"
                value={activeTitle}
                onChange={(e) => setActiveTitle(e.target.value)}
                placeholder="Título da anotação..."
                className="bg-transparent border-none outline-none font-display font-bold text-xl text-on-surface flex-1"
              />

              <div className="flex items-center gap-2">
                {savedFeedback && (
                  <span className="text-xs font-mono text-secondary-emerald font-semibold">
                    Salvo!
                  </span>
                )}
                <button
                  onClick={handleSave}
                  className="px-3.5 py-1.5 bg-secondary-emerald/20 hover:bg-secondary-emerald/30 text-secondary-emerald border border-secondary-emerald/40 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Salvar
                </button>
                {notes.length > 1 && (
                  <button
                    onClick={() => handleDelete(selectedNoteId)}
                    className="p-1.5 text-outline hover:text-error rounded-lg hover:bg-surface-container transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={activeContent}
              onChange={(e) => setActiveContent(e.target.value)}
              placeholder="Escreva suas anotações aqui (suporta texto livre, dicas de comandos, etc)..."
              rows={12}
              className="w-full bg-surface-container/60 border border-outline-subtle rounded-xl p-4 text-xs font-mono text-on-surface leading-relaxed outline-none focus:border-primary-electric resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
