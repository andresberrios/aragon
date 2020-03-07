interface BaseStep {
  id: string;
  type: string;
}

export interface Instruction extends BaseStep {
  type: "instruction";
  text: string;
  details?: string;
}

export interface StepGroup extends BaseStep {
  type: "group";
  title: string;
  steps: Step[];
}

export interface Conditional extends BaseStep {
  type: "conditional";
  condition: string;
  then: Step[];
  else?: Step[];
}

export type Step = Instruction | Conditional | StepGroup;

export interface Procedure {
  name: string;
  description: string;
  steps: Step[];
  createdAt?: string;
  updatedAt?: string;
}
