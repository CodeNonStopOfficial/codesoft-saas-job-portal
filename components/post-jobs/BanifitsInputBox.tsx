
"use client";

import { useState } from "react";
import { X, Plus, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BenefitsInputProps {
  value: string[];
  onChange: (benefits: string[]) => void;
  placeholder?: string;
  maxBenefits?: number;
}

export function BenefitsInput({
  value = [],
  onChange,
  placeholder = "e.g. Health Insurance",
  maxBenefits = 20,
}: BenefitsInputProps) {
  const [input, setInput] = useState("");

  const addBenefit = () => {
    const benefit = input.trim();

    if (
      !benefit ||
      value.some(
        (item) => item.toLowerCase() === benefit.toLowerCase()
      ) ||
      value.length >= maxBenefits
    ) {
      return;
    }

    onChange([...value, benefit]);
    setInput("");
  };

  const removeBenefit = (benefitToRemove: string) => {
    onChange(
      value.filter((benefit) => benefit !== benefitToRemove)
    );
  };

  return (
    <div className="max-w-full space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          placeholder={placeholder}
          disabled={value.length >= maxBenefits}
          onChange={(e) => setInput(e.target.value)}
          className="h-11"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addBenefit();
            }
          }}
        />

        <Button
          type="button"
          variant="outline"
          onClick={addBenefit}
          disabled={!input.trim() || value.length >= maxBenefits}
          className="h-11 px-4"
        >
          <Plus className="mr-1 size-4" />
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {value.map((benefit) => (
          <Badge
            key={benefit}
            variant="outline"
            className="gap-1 px-3 py-4.5 text-sm"
          >
            <Gift className="size-3.5" />
            {benefit}

            <button
              type="button"
              aria-label={`Remove ${benefit}`}
              onClick={() => removeBenefit(benefit)}
              className="ml-1 rounded-full hover:text-destructive"
            >
              <X className="size-3.5" />
            </button>
          </Badge>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {value.length}/{maxBenefits} benefits · Press Enter to add
      </p>
    </div>
  );
}
