import { createLazyFileRoute } from "@tanstack/react-router";
import HomePage from "../features/home/page";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
