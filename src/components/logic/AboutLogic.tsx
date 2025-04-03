// Hook personalizado para manejar la lógica de la sección "Sobre Nosotros"
export const useAboutLogic = () => {
  // Definición de la misión de la plataforma
  const mission = "Facilitar la gestión y el control de la salud de las mascotas mediante una plataforma intuitiva y accesible para dueños y veterinarios.";
  // Definición de la visión de la plataforma
  const vision = "Ser la plataforma líder en gestión veterinaria, ayudando a mejorar la calidad de vida de las mascotas con tecnología innovadora.";
  // Lista de valores de la plataforma, cada uno con un título y una descripción

  const values = [
    { title: "Compromiso", description: "Trabajamos para brindar un servicio confiable y seguro para los dueños de mascotas." },
    { title: "Innovación", description: "Buscamos soluciones tecnológicas para mejorar la experiencia del usuario." },
    { title: "Accesibilidad", description: "Hacemos que la gestión de la salud de las mascotas sea sencilla para todos." },
    { title: "Amor por Ellos", description: "Creemos en el bienestar animal y en proporcionar herramientas para su cuidado." },
  ];
  // Retornamos los valores para ser usados en el componente About

  return { mission, vision, values };
};
