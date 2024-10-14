import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";
import { userEvent, within, expect } from "@storybook/test";

const meta = {
  title: "AGPTUI/SearchBar",
  component: SearchBar,
  parameters: {
    layout: {
      center: true,
      padding: 0,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "searched" },
    placeholder: { control: "text" },
    backgroundColor: { control: "text" },
    iconColor: { control: "text" },
    textColor: { control: "text" },
    placeholderColor: { control: "text" },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (query: string) => console.log(`Searched: ${query}`),
    placeholder: 'Search for tasks like "optimise SEO"',
  },
};

export const CustomStyles: Story = {
  args: {
    onSearch: (query: string) => console.log(`Searched: ${query}`),
    placeholder: "Enter your search query",
    backgroundColor: "bg-blue-100",
    iconColor: "text-blue-500",
    textColor: "text-blue-700",
    placeholderColor: "text-blue-400",
  },
};

export const WithInteraction: Story = {
  args: {
    onSearch: (query: string) => console.log(`Searched: ${query}`),
    placeholder: "Type and press Enter",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type and press Enter");

    await userEvent.type(input, "test query");
    await userEvent.keyboard("{Enter}");

    await expect(input).toHaveValue("test query");
  },
};

export const EmptySubmit: Story = {
  args: {
    onSearch: (query: string) => console.log(`Searched: ${query}`),
    placeholder: "Empty submit test",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Empty submit test");

    await userEvent.keyboard("{Enter}");

    await expect(input).toHaveValue("");
  },
};
