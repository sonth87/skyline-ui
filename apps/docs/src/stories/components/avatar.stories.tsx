import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
} from "@skyline/ui/avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar,
  render(props) {
    return (
      <Avatar {...props}>
        <AvatarImage src="https://github.com/fellipeutaka.png" />
        <AvatarFallback>FU</AvatarFallback>
      </Avatar>
    );
  },
};

export default meta;

type Story = StoryObj<AvatarProps>;

export const Default: Story = {};

export const Group: Story = {
  render(props) {
    const users = [
      {
        username: "zKriguer",
        fallback: "KR",
      },
      {
        username: "MatheusLukas",
        fallback: "ML",
      },
      {
        username: "Kyori-kyo",
        fallback: "KK",
      },
      {
        username: "Nick-Gabe",
        fallback: "NG",
      },
      {
        username: "fellipeutaka",
        fallback: "FU",
      },
    ];

    return (
      <div className="flex items-center -space-x-5">
        {users.map((user) => (
          <Avatar {...props} key={user.username}>
            <AvatarImage src={`https://github.com/${user.username}.png`} />
            <AvatarFallback>{user.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
  },
};
