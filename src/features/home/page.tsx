// import CardContainer from "./components/card-container";
// import HomeCard from "./components/home-card";
// import { ClipboardList } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserRound } from "lucide-react";

// const cards = [
//   {
//     title: "Tasks",
//     description: "Here's a list of your tasks for this month!",
//     icon: <ClipboardList className="size-5" />,
//     buttonLabel: "Go",
//     buttonTo: "/tasks",
//   },
// ];

const usuario = {
  usuario: "D78136",
  nombre: "Emanuel Gomez",
  perfil: "Supervisor",
};

const HomePage = () => {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2 grid items-start gap-6 lg:col-span-2">
            {
              <Alert>
                <UserRound className="h-4 w-4" />
                <AlertTitle>Bienvenido</AlertTitle>
                <AlertDescription>
                  <p>Usuario: {usuario.usuario}</p>
                  <p>Nombre: {usuario.nombre}</p>
                  <p>Perfil: {usuario.perfil}</p>
                </AlertDescription>
              </Alert>

              /* {cards.map((item) => (
              <CardContainer key={item.title}>
                <HomeCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  buttonLabel={item.buttonLabel}
                  buttonTo={item.buttonTo}
                />
              </CardContainer>
            ))} */
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
