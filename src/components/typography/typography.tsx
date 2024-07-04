import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-6xl font-bold",
      h2: "scroll-m-20 text-5xl font-bold",
      h3: "scroll-m-20 text-4xl font-bold",
      h4: "scroll-m-20 text-3xl font-bold",
      h5: "scroll-m-20 text-2xl font-bold",
      h6: "scroll-m-20 text-xl font-bold",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      regularText: "text-base",
      largeText: "text-lg font-semibold",
      smallText: "text-sm leading-none",
      mutedText: "text-sm text-muted-foreground",
      mutedText2: "text-base text-muted-foreground",
    },
    weight: {
      bold: "!font-bold",
      semibold: "!font-semibold",
      normal: "!font-normal",
      medium: "!font-medium",
      light: "!font-light",
    },
  },
  defaultVariants: {
    variant: "regularText",
    weight: "normal",
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  inlineCode: "code",
  largeText: "div",
  regularText: "div",
  smallText: "small",
  lead: "p",
  mutedText: "p",
  mutedText2: "p",
  ul: "ul",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, weight, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? "div";
    return (
      <Comp
        className={cn(typographyVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
