export const getPetsByOwnerId = async (ownerId: number) => {
    try {
        const response = await fetch("http://localhost:5000/pets");
        if (!response.ok) {
            throw new Error("Error al obtener los datos de mascotas");
        }
        const pets = await response.json();

        return pets.filter((pet: any) => Number(pet.ownerId) === ownerId);
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        return [];
    }
};

