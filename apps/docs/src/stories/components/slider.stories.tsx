import { Slider, type SliderProps } from "@skyline/ui/slider";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<SliderProps> = {
  title: "Components/Slider",
  component: Slider,
  args: {
    step: 1,
    max: 100,
    defaultValue: [0],
  },
};

export default meta;

type Story = StoryObj<SliderProps>;

export const Default: Story = {};
