import { Typography } from "../typography/typography";

interface PageHeaderProps {
  title: string;
  subtitle?: string | null;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Typography
            variant={"h2"}
            className="text-2xl font-bold tracking-tight"
          >
            {props.title}
          </Typography>

          {props.subtitle !== null && (
            <Typography variant={"p"} className="text-muted-foreground">
              {props.subtitle}
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
