export const useAboutLogic = () => {
    const mission = "Facilitar la gestión y el control de la salud de las mascotas mediante una plataforma intuitiva y accesible para dueños y veterinarios.";
  
    const vision = "Ser la plataforma líder en gestión veterinaria, ayudando a mejorar la calidad de vida de las mascotas con tecnología innovadora.";
  
    const values = [
      { title: "Compromiso", description: "Trabajamos para brindar un servicio confiable y seguro para los dueños de mascotas." },
      { title: "Innovación", description: "Buscamos soluciones tecnológicas para mejorar la experiencia del usuario." },
      { title: "Accesibilidad", description: "Hacemos que la gestión de la salud de las mascotas sea sencilla para todos." },
      { title: "Amor por Ellos", description: "Creemos en el bienestar animal y en proporcionar herramientas para su cuidado." },
    ];
  
    return { mission, vision, values };
  };
  