import { Command } from 'cmdk';
import React, { useEffect } from 'react';
import "../css/search.scss";

// Use Command/CTRL + K to activate


const Search = () => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, []);

  return (
    <div className="raycast">
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input />

        <Command.List>
          {loading && <Command.Loading>Loading…</Command.Loading>}

          <Command.Empty>No results found!</Command.Empty>

          <Command.Group heading="Fruits">
            <Command.Item>Apple</Command.Item>
            <Command.Item>Orange</Command.Item>
            <Command.Separator />
            <Command.Item>Pear</Command.Item>
            <Command.Item>Blueberry</Command.Item>
          </Command.Group>

          <Command.Item>Fish</Command.Item>
        </Command.List>
      </Command.Dialog>
    </div>
  );
};

export default Search;
