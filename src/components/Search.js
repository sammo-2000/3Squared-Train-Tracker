import { Command } from "cmdk";
import React, { useEffect, useState, useRef } from "react";
import "../css/search.scss";
import * as Popover from "@radix-ui/react-popover";

// Use Command/CTRL + K to activate

const Search = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("linear");
  const inputRef = (useRef < HTMLInputElement) | (null > null);
  const listRef = useRef(null);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const style = {
    position: "absolute",
    width: "100%",
    zIndex: 1000,
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  };

  return (
    <div style={style}>
      <Command.Dialog
        className="raycast"
        open={open}
        onOpenChange={setOpen}
        style={style}
      >
        <Command loop>
          <Command.Input
            id={inputRef}
            autoFocus
            placeholder="Search for trains and stations..."
          />
          <hr cmdk-raycast-loader="" />
          <Command.List id={listRef}>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Stations">
              <Command.Item
                onSelect={(value) => console.log("Selected", value)}
              >
                Station 123847ABQWZ
              </Command.Item>
              <Command.Item
                onSelect={(value) => console.log("Selected", value)}
              >
                Station 87987HJUGA
              </Command.Item>
            </Command.Group>
            <Command.Group heading="Trains">
              <Command.Item
                onSelect={(value) => console.log("Selected", value)}
              >
                Train 239847KJUGHdsfui
              </Command.Item>
              <Command.Item
                onSelect={(value) => console.log("Selected", value)}
              >
                Train sdkik2893849798
              </Command.Item>
              <Command.Item
                onSelect={(value) => console.log("Selected", value)}
              >
                Train 123444789KJHJ
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </Command.Dialog>
    </div>
  );
};

export default Search;
