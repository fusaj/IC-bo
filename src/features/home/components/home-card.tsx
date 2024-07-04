import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

interface HomeCardProps {
  icon: unknown;
  title: string;
  description: string;
  buttonLabel: string;
  buttonTo: string;
}

const HomeCard = ({
  title,
  description,
  buttonLabel,
  buttonTo,
}: HomeCardProps) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4"></CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={buttonTo}>{buttonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeCard;
