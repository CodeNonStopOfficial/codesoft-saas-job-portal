"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
  maxSkills?: number;
}

export function SkillsInput({
  value = [],
  onChange,
  placeholder = "Type a skill and press Enter",
  maxSkills = 20,
}: SkillsInputProps) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const skill = input.trim();

    if (
      !skill ||
      value.some((item) => item.toLowerCase() === skill.toLowerCase()) ||
      value.length >= maxSkills
    ) {
      return;
    }

    onChange([...value, skill]);
    setInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={input}
          placeholder={placeholder}
          disabled={value.length >= maxSkills}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          className="h-11"
        />

        <Button
          type="button"
          variant="outline"
          onClick={addSkill}
          disabled={!input.trim() || value.length >= maxSkills}
          className="px-4 h-11"
        >
          <Plus className="mr-1 size-4" />
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="gap-1 px-3 py-4.5 text-sm"
          >
            {skill}

            <button
              type="button"
              aria-label={`Remove ${skill}`}
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full hover:text-destructive"
            >
              <X className="size-3.5" />
            </button>
          </Badge>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {value.length}/{maxSkills} skills · Press Enter to add
      </p>
    </div>
  );
}
