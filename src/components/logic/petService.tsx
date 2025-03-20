export const getPetsByOwnerId = async (): Promise<any[]> => {
    try {
        const userData = localStorage.getItem("user");
        if (!userData) {
            throw new Error("No hay usuario logueado. Inicia sesión.");
        }

        const user = JSON.parse(userData);
        const loggedInUserId = Number(user.id);

        const response = await fetch("http://localhost:5000/pets");
        if (!response.ok) {
            throw new Error("Error al obtener los datos de mascotas.");
        }

        const pets = await response.json();
        return pets.filter((pet: any) => Number(pet.ownerId) === loggedInUserId);
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        return [];
    }
};
