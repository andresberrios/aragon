interface BaseStep {
  id: string;
}

export interface Instruction extends BaseStep {
  text: string;
  details?: string;
}

export interface Conditional extends BaseStep {
  condition: string;
  then: Step[];
  else?: Step[];
}

export type Step = Instruction | Conditional;

export interface Procedure {
  name: string;
  description: string;
  steps: Step[];
}
